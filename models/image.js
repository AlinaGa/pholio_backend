const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  id: "Number",
  name: "String",
});

const image = mongoose.model("Image", imageSchema);

module.exports = image;
