const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: "String",
  // gallery:
});

const image = mongoose.model("Image", imageSchema);

module.exports = image;
