const Reserve = require("../../db/models/Reserves");

const getReserves = async (req, res) => {
  try {
    const reserves = await Reserve.find();
    res.status(200).json({ reserves });
  } catch (error) {
    error.code = 404;
    error.customMessage = "reserves not found";
  }
};

module.exports = { getReserves };
