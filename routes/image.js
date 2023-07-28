const express = require("express");
const upload = require("../middleswares/multer-upload");
const { createImage, getImage, deleteImage } = require("../controllers/image");
const uploadFile = require("../middleswares/s3_middleware");
// const listObjects = require("../middleswares/signedUrl");

const imageRouter = express.Router();

imageRouter.post("/", upload.single("image"), uploadFile, createImage);

imageRouter.get("/", getImage);
imageRouter.delete("/:id", deleteImage);

module.exports = imageRouter;
