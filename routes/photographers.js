const express = require("express");
const {
  createPhotographer,
  getPhotographer,
  getPhotographerByCompany,
  updatePhotographer,
  deletePhotographer,
} = require("../controllers/photographer");

const { getPhotographerClients } = require("../controllers/client");

const { verifyToken } = require("../middleswares/verifyToken");
const { login, logout, signup, getProfile } = require("../auth");

const photographerRouter = express.Router();

photographerRouter.post("/", createPhotographer);
photographerRouter.post("/signup", signup);
photographerRouter.post("/login", login);
photographerRouter.post("/logout", logout);
photographerRouter.get("/profile", verifyToken, getProfile);
photographerRouter.get("/", getPhotographer);
photographerRouter.get("/clients", verifyToken, getPhotographerClients);
photographerRouter.put("/:id", updatePhotographer);
photographerRouter.delete("/:id", deletePhotographer);
photographerRouter.get("/:company", getPhotographerByCompany);


module.exports = photographerRouter;
