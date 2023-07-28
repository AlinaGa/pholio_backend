const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Add name"] },
  date: Date,
  price: { type: String, required: [true, "Add price"] },
  photographer: { type: mongoose.Types.ObjectId, ref: "Photographer" },
  client: { type: mongoose.Types.ObjectId, ref: "Client" },
});

const gallery = mongoose.model("Gallery", gallerySchema);

module.exports = gallery;
