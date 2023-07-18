const express = require("express");
const {
  createPhotographer,
  getPhotographer,
  getPhotographerByCompany,
  updatePhotographer,
  deletePhotographer,
} = require("../controllers/photographer");

const photographerRouter = express.Router();

photographerRouter.post("/", createPhotographer);
photographerRouter.get("/", getPhotographer);
photographerRouter.get("/company", getPhotographerByCompany);
photographerRouter.put("/:id", updatePhotographer);
photographerRouter.delete("/:id", deletePhotographer);

module.exports = photographerRouter;
