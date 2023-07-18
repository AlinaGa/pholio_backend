const mongoose = require("mongoose");

const photographerSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: [true, "Add name"] },
  email: { type: String, required: [true, "Add email"] },
  password: { type: String, required: [true, "Add password"], minlength: 5 },
  company: String,
});

const photographer = mongoose.model("Photographer", photographerSchema);

module.exports = photographer;
