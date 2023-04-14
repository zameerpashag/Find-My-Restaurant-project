const validator = require("validator");

exports.isNumber = (req, res, next) => {
  if (isNaN(+req.params.rating)) {
    res.status(400).send({
      message:
        "Sorry, we could not process your input. Please enter a valid number.",
    });
    return;
  }
  next();
};

exports.isMongoId = (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    return res.status(400).send({
      message: "Failed! Object ID is invalid.",
    });
  }
  next();
};
