const express = require("express");
const {
  getPhotographers,
  getPhotographer,
  createPhotographer,
  getPhotographerByCompany,
  updatePhotographer,
  deletePhotographer,
} = require("../controllers2/photographer");

const photographerRouter = express.Router();

photographerRouter.post("/", createPhotographer);

photographerRouter.get("/", getPhotographers);

photographerRouter.get("/:id", getPhotographer);

photographerRouter.get("/company/:companyname", getPhotographerByCompany);

photographerRouter.put("/:id", updatePhotographer);

photographerRouter.delete("/:id", deletePhotographer);

module.exports = photographerRouter;
