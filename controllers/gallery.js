const Gallery = require("../models/gallery");

const createGallery = async (req, res) => {
  try {
    const { name, price, client } = req.body;
    const newGallery = await Gallery.create({
      name,
      price,
      // client,
      photographer: req.user.id,
    });
    res.json(newGallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getGallery = async (req, res) => {
  try {
    const newGallery = await Gallery.find();
    res.json(newGallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserGallery = async (req, res) => {
  let query;
  if (req.user.role === "admin") {
    query = { photographer: req.user.id };
  } else {
    query = { client: req.user.id };
  }

  try {
    const gallaries = await Gallery.find(query);
    res.json(gallaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createGallery, getGallery, getUserGallery };
