const express = require("express");

const { createGallery, getGallery } = require("../controllers/gallery");

const galleryRouter = express.Router();

galleryRouter.post("/", createGallery);
galleryRouter.get("/", getGallery);

module.exports = galleryRouter;
