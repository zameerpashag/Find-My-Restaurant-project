const constants = require("../utils/constants");
const Restaurant = require("../models/restaurant.model");
const validator = require("validator");

exports.verifyRestaurantReqBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  if (!req.body.name) {
    res.status(400).send({
      message: "Failed! Restaurant Name is not provided !",
    });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({
      message: "Failed! Description is not provided !",
    });
    return;
  }

  const restaurantCategory = (req.body.category =
    req.body.category.toUpperCase());
  const restaurantCategories = [
    constants.restaurantCategory.dineout,
    constants.restaurantCategory.takeout,
  ];
  if (
    restaurantCategory &&
    !restaurantCategories.includes(restaurantCategory)
  ) {
    res.status(400).send({
      message:
        "Category provided is invalid. Possible values DINEOUT | TAKEOUT  ",
    });
    return;
  }

  if (!req.body.imageURL) {
    res.status(400).send({
      message: "Failed! imageURL is not provided !",
    });
    return;
  }

  if (!req.body.location) {
    res.status(400).send({
      message: "Failed! Location is not provided !",
    });
    return;
  }

  if (!req.body.phone) {
    res.status(400).send({
      message: "Failed! Phone number is not provided !",
    });
    return;
  }

  if (!req.body.rating) {
    res.status(400).send({
      message: "Failed! Rating is not provided !",
    });
    return;
  }

  next();
};

exports.verifyRestaurantUpdateBody = async (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    return res.status(400).send({
      message: "Failed! Object ID is invalid.",
    });
  }
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).send({
      message: "No Restaurant found for given ID.",
    });
  }

  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Restaurant Data is required",
    });
    return;
  }

  if (req.body.name !== undefined && req.body.name !== null && !req.body.name) {
    res.status(400).send({
      message: "Failed! Restaurant Name is invalid!",
    });
    return;
  }

  const restaurantCategory = (req.body.category =
    req.body.category?.toUpperCase());
  const restaurantCategories = [
    constants.restaurantCategory.dineout,
    constants.restaurantCategory.takeout,
  ];
  if (
    restaurantCategory &&
    !restaurantCategories.includes(restaurantCategory)
  ) {
    res.status(400).send({
      message:
        "Category provided is invalid. Possible values DINEOUT | TAKEOUT  ",
    });
    return;
  }

  if (req.body.phone && isNaN(+req.body.phone.substring(1))) {
    res.status(400).send({
      message: "Failed! Restaurant Mobile Number is invalid!",
    });
    return;
  }

  if (req.body.rating && isNaN(+req.body.rating)) {
    res.status(400).send({
      message: "Failed! Restaurant Rating is invalid!",
    });
    return;
  }

  if (req.body.imageURL && !validator.isURL(req.body.imageURL)) {
    res.status(400).send({
      message: "Failed! Restaurant imageURL is invalid!",
    });
    return;
  }
  next();
};
