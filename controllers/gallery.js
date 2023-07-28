const Gallery = require("../models/gallery");

const createGallery = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newGallery = await Gallery.create({
      name,
      price,
      clientId,
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

module.exports = { createGallery, getGallery };
