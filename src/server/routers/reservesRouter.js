const express = require("express");
const { getReserves } = require("../controllers/reservesControllers");
const auth = require("../middlewares/auth/auth");

const reservesRouter = express.Router();

reservesRouter.get("/", auth, getReserves);

module.exports = reservesRouter;
