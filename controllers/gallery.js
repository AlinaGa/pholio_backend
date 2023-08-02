const Gallery = require("../models/gallery");

const createGallery = async (req, res) => {
  try {
    const { name, date, clientId } = req.body;
    const newGallery = await Gallery.create({
      name,
      date,
      photographer: req.user.id,
      client: req.body.clientId,
    });
    res.json(newGallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findById(id);
    res.json(gallery);
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
    const galleries = await Gallery.find(query);
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createGallery, getGallery, getUserGallery };
