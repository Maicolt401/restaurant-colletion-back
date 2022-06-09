require("dotenv").config();
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
  const { img, imgBackup } = req;

  try {
    const newReserve = await Reserve.create({
      name,
      hour,
      numberPersons,
      date,
      dni,
      image: img,
      imageBackup: imgBackup,
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
