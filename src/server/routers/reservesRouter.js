require("dotenv").config();
const express = require("express");
const {
  getReserves,
  deleteReserve,
} = require("../controllers/reservesControllers");

const reservesRouter = express.Router();

reservesRouter.get("/", getReserves);
reservesRouter.delete("/:idReserve", deleteReserve);

module.exports = reservesRouter;
