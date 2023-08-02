const express = require("express");
const upload = require("../middleswares/multer-upload");
const { createImage, getImage, deleteImage, getThumbnail } = require("../controllers/image");
const uploadFile = require("../middleswares/s3_middleware");
const { verifyToken } = require("../middleswares/verifyToken");

const imageRouter = express.Router();

imageRouter.post(
  "/",
  verifyToken,
  upload.single("image"),
  uploadFile,
  createImage
);

imageRouter.get("/", getImage);
imageRouter.get("/thumbnail", getThumbnail);

imageRouter.delete("/:id", deleteImage);

module.exports = imageRouter;
