require("dotenv").config();
const bcrypt = require("bcrypt");
const debug = require("debug")("redsocial:server:controllers:login");
const chalk = require("chalk");
const User = require("../../db/models/User");

const registerUser = async (req, res, next) => {
  const { restauranName, CIF, username, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({ username });

  if (user) {
    const error = new Error();
    error.statusCode = 409;
    error.customMessage = "this user already exists";

    next(error);
  }

  try {
    await User.create({
      restauranName,
      username,
      CIF,
      password: encryptedPassword,
    });
    res.status(201).json(req.body);
    debug(chalk.yellow("user created"));
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "bad request";
    next(error);
  }
};

module.exports = registerUser;
