const { Schema, model } = require("mongoose");
const constants = require("../utils/constants");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        constants.restaurantCategory.takeout,
        constants.restaurantCategory.dineout,
      ],
      default: constants.restaurantCategory.dineout,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Restaurant", restaurantSchema);
