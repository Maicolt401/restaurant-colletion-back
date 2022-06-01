require("dotenv").config();
const bcrypt = require("bcrypt");
const debug = require("debug")("redsocial:server:controllers:login");
const chalk = require("chalk");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../db/models/User");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = debug(403, "Bad request", "User or password incorrect");
    next(error);
    return;
  }
  const userData = {
    username: user.username,
    name: user.name,
  };

  const rightPassword = await bcrypt.compare(password, user.password);
  if (!rightPassword) {
    const error = debug(403, "Bad request", "User or password incorrect");

    next(error);
    return;
  }
  const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);

  res.status(200).json({ token });
};

const registerUser = async (req, res, next) => {
  const { restaurantName, CIF, username, password } = req.body;

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
      restaurantName,
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

module.exports = { userLogin, registerUser };
