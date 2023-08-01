const mongoose = require("mongoose");

const photographerSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: [true, "Please enter your Name"] },
  company: { type: String, required: [true, "Add Company Name"] },
  email: { type: String, required: [true, "Add email"] },
  password: {
    type: String,
    required: [true, "Add password"],
    minlength: 5,
    select: false,
  },
  role: { type: String, enum: ["admin"], default: "admin" },
});

const photographer = mongoose.model("Photographer", photographerSchema);

module.exports = photographer;
