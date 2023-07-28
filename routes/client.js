const express = require("express");

const { createClient, getClient } = require("../controllers/client");

const clientRouter = express.Router();

clientRouter.post("/", createClient);
clientRouter.get("/", getClient);

module.exports = clientRouter;
