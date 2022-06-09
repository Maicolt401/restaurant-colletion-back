require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getReserves,
  deleteReserve,
  createReserve,
} = require("../controllers/reserverControllers/reservesControllers");

const upload = multer({
  dest: path.join("uploads", "images"),
});

const reservesRouter = express.Router();

reservesRouter.get("/", getReserves);
reservesRouter.delete("/:idReserve", deleteReserve);
reservesRouter.post("/create", upload.single("image"), createReserve);

module.exports = reservesRouter;
