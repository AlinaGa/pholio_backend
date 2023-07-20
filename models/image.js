const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  id: "Number",
  url: { type: String },
});

const image = mongoose.model("Image", imageSchema);

module.exports = image;
