const image = require("../models/image");
const { uploadFile } = require("../middleswares/s3_middleware");

const createImage = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    // probably do an error handling function here
    const result = await uploadFile(file);
    console.log(result);
    const description = req.body.description;
    // res.send("Done!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getImage = async (req, res) => {
  try {
    const newImage = await Image.find();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createImage, getImage };
