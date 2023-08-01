const Client = require("../models/client");

const createClient = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(email, name, password);
    const newClient = await Client.create({
      email,
      name,
      password,
    });
    res.json(newClient);
    console.log("req.body", req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getClient = async (req, res) => {
  try {
    const newClient = await Client.find();
    res.json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createClient, getClient };
