const express = require("express");

const {
  createClient,
  getClient,
  login,
  logout,
} = require("../controllers/client");
const { verifyToken } = require("../middleswares/verifyToken");

const clientRouter = express.Router();

clientRouter.post("/", verifyToken, createClient);
clientRouter.get("/", getClient);
clientRouter.post("/login", login);
clientRouter.post("/logout", logout);

module.exports = clientRouter;
