const Reserve = require("../../db/models/Reserve");

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

module.exports = { getReserves, deleteReserve };
