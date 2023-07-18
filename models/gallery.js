const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: [true, "Add name"] },
  date: Date,
  price: { type: String, required: [true, "Add price"] },
  client_ID: String,
});

const gallery = mongoose.model("Gallery", gallerySchema);

module.exports = gallery;
