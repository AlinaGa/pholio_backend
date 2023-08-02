const express = require("express");

const {
  createGallery,
  getGallery,
  getUserGallery,
} = require("../controllers/gallery");
const { verifyToken } = require("../middleswares/verifyToken");

const galleryRouter = express.Router();

galleryRouter.post("/", verifyToken, createGallery);
// galleryRouter.get("/", getGallery);
galleryRouter.get("/", verifyToken, getUserGallery);


module.exports = galleryRouter;
