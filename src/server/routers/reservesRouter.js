require("dotenv").config();
const express = require("express");
const { getReserves } = require("../controllers/reservesControllers");

const reservesRouter = express.Router();

reservesRouter.get("/", getReserves);

module.exports = reservesRouter;
