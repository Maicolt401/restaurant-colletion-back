require("dotenv").config();
const bcrypt = require("bcrypt");
const debug = require("debug")("redsocial:server:controllers:login");
const chalk = require("chalk");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../db/models/User");

const registerUser = async (req, res, next) => {
  const { restaurantName, CIF, username, password } = req.body;
  const saltRounds = 10;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

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
  } catch {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "bad request";

    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error();
    error.statusCode = 403;
    error.customMessage = "bad request";
    debug("User or password incorrect");
    next(error);
    return;
  }
  const userData = {
    username: user.username,
    name: user.name,
  };

  const rightPassword = await bcrypt.compare(password, user.password);
  if (!rightPassword) {
    const error = new Error();
    error.statusCode = 403;
    error.customMessage = "bad request";
    debug("User or password incorrect");

    next(error);
    return;
  }
  const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);

  res.status(200).json({ token });
};

module.exports = { registerUser, userLogin };
