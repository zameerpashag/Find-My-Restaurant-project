const Restaurant = require("../models/restaurant.model");
const objectConverter = require("../utils/objectConverter");

exports.createRestaurant = async (req, res) => {
  const restaurantObject = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    imageURL: req.body.imageURL,
    location: req.body.location,
    phone: req.body.phone,
    rating: req.body.rating,
  };

  try {
    const restaurant = await Restaurant.create(restaurantObject);

    res.status(200).send(restaurant);
  } catch (err) {
    console.log("Some error happened while creating restaurant", err.message);
    res.status(500).send({
      message: "Some error occurred while creating the Restaurant",
    });
  }
};

exports.getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    res.status(200).send({
      restaurants,
      message: "Restaurants fetched successfully.",
    });
  } catch (err) {
    console.log("Some error happened while fetching restaurant", err.message);
    res.status(500).send({
      message: "Some error occurred while fetching the Restaurant",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Restaurant.aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, category: "$_id" } },
    ]);
    console.log(categories);
    res.status(200).send(objectConverter.categoryResponse(categories));
  } catch (err) {
    console.log("Some error happened while fetching categories", err.message);
    res.status(500).send({
      message: "Some error occurred while fetching categories",
    });
  }
};

exports.getAllRestaurantByCategory = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      category: req.params.categoryName.toUpperCase(),
    });

    res.status(200).send(restaurants);
  } catch (err) {
    console.log("Some error happened while fetching Restaurant", err.message);
    res.status(500).send({
      message: "Some error occurred while fetching the Restaurant",
    });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (restaurant) {
      res.status(200).send(restaurant);
    } else {
      res.status(404).send({
        message: "No Restaurant found with the given ID",
      });
    }
  } catch (err) {
    console.log("Some error happened while fetching Restaurant", err.message);
    res.status(500).send({
      message: "Some error occurred while fetching the Restaurant",
    });
  }
};

exports.getRestaurantsByRating = async (req, res) => {
  try {
    const restaurant = await Restaurant.aggregate([
      {
        $match: { rating: { $gte: +req.params.rating } },
      },
    ]);

    res.status(200).send(restaurant);
  } catch (err) {
    console.log("Some error happened while fetching Restaurant", err.message);
    res.status(500).send({
      message: "Some error occured while fetching the Restaurant.",
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    const restaurantObj = {
      name: req.body.name || restaurant.name,
      description: req.body.description || restaurant.description,
      category: req.body.category || restaurant.category,
      imageURL: req.body.imageURL || restaurant.imageURL,
      location: req.body.location || restaurant.location,
      phone: req.body.phone || restaurant.phone,
      rating: req.body.rating || restaurant.rating,
    };
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      restaurantObj,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(500).json({
        message: "Failed to update the restaurant.",
      });
    }
    res.status(200).send({
      message: "Restaurant updated successfully.",
    });
  } catch (err) {
    console.log("Some error happened while fetching Restaurant", err.message);
    res.status(500).send({
      message: "Some error occured while fetching the Restaurant.",
    });
  }
};

exports.deleteRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      restaurant,
      message: "Restaurant deleted successfully.",
    });
  } catch (err) {
    console.log("Some error happened while deleting Restaurant", err.message);
    res.status(500).send({
      message: "Some error occured while deleting the Restaurant.",
    });
  }
};

exports.deleteAllRestaurants = async (req, res) => {
  try {
    const restaurant = await Restaurant.deleteMany({});

    return res.status(200).send({
      restaurant,
      message: "Restaurants deleted successfully.",
    });
  } catch (err) {
    console.log("Some error happened while deleting Restaurant", err.message);
    res.status(500).send({
      message: "Some error occured while deleting the Restaurant.",
    });
  }
};
