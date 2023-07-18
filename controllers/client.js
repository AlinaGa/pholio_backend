const Client = require("../models/client");

const createClient = async (req, res) => {
  try {
    const { name, password } = req.body;
    const newClient = await Client.create({
      name,
      password,
    });
    res.json(newClient);
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
