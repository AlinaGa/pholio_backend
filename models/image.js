const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: "String",
  originalName: "String",
  gallery: { type: mongoose.Types.ObjectId, ref: "Gallery" },
});

const image = mongoose.model("Image", imageSchema);

module.exports = image;
