const { verifyRestaurantBody, verifyParams } = require("../middlewares");
const restaurantContoller = require("../controllers/restaurant.controller");

module.exports = (app) => {
  app.post(
    "/api/restaurant/add",
    [verifyRestaurantBody.verifyRestaurantReqBody],
    restaurantContoller.createRestaurant
  );

  app.get(
    "/api/restaurant/categories/:categoryName",
    restaurantContoller.getAllRestaurantByCategory
  );

  app.get("/api/restaurant", restaurantContoller.getAllRestaurant);

  app.get("/api/restaurant/categories", restaurantContoller.getAllCategories);

  app.get(
    "/api/restaurant/:id",
    [verifyParams.isMongoId],
    restaurantContoller.getRestaurantById
  );

  app.get(
    "/api/restaurant/rating/:rating",
    [verifyParams.isNumber],
    restaurantContoller.getRestaurantsByRating
  );

  app.put(
    "/api/restaurant/:id",
    [verifyRestaurantBody.verifyRestaurantUpdateBody],
    restaurantContoller.updateRestaurant
  );

  app.delete(
    "/api/restaurant/:id",
    [verifyParams.isMongoId],
    restaurantContoller.deleteRestaurantById
  );

  app.delete("/api/restaurant", restaurantContoller.deleteAllRestaurants);
};
