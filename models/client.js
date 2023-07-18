const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  id: "Number",
  name: { type: String },
  password: { type: String, required: true },
});

const client = mongoose.model("Client", clientSchema);

module.exports = client;
