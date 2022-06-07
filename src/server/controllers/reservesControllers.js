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

module.exports = { getReserves };
