const express = require("express");
const upload = require("../middleswares/multer-upload");
const { createImage, getImage } = require("../controllers/image");

const imageRouter = express.Router();

imageRouter.post("/", upload.single("image"), createImage);

imageRouter.get("/", getImage);

module.exports = imageRouter;
