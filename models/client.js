const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({

  email: { type: String, required: true },
  name: { type: String },
  password: { type: String, required: true },
  photographer: {
    type: mongoose.Types.ObjectId,
    ref: "Photographer",
    required: true,
  },
});

const client = mongoose.model("Client", clientSchema);

module.exports = client;
