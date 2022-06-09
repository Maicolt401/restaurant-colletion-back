require("dotenv").config();
const path = require("path");
const debug = require("debug")("reserve:server:reserverController");
const fs = require("fs");
const Reserve = require("../../../db/models/Reserve/Reserve");

const getReserves = async (req, res, next) => {
  try {
    const reserves = await Reserve.find();
    res.status(200).json({ reserves });
  } catch (error) {
    error.code = 404;
    error.customMessage = "reserves not found";

    next(error);
  }
};

const deleteReserve = async (req, res, next) => {
  const { idReserve } = req.params;

  try {
    await Reserve.findByIdAndDelete(idReserve);

    res.status(200).json({ msg: "Reserve deleted" });
  } catch (error) {
    error.customMessage = "No Reserve with that id found";
    error.code = 404;

    next(error);
  }
};

const createReserve = async (req, res, next) => {
  const { name, hour, numberPersons, date, dni } = req.body;
  const { file } = req;

  const newImage = `${Date.now()}${file.originalname}`;

  try {
    fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newImage),
      async (error) => {
        if (error) {
          debug("no puedes renombrar");
          next(error);
        }
      }
    );

    const newReserve = await Reserve.create({
      name,
      hour,
      numberPersons,
      date,
      dni,
      image: path.join("uploads", "images"),
    });

    res.status(201).json(newReserve);
  } catch {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "bad request";

    next(error);
  }
};

module.exports = { getReserves, deleteReserve, createReserve };
