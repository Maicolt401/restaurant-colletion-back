require("dotenv").config();
const jwt = require("jsonwebtoken");
const debug = require("debug")("reserve:middlewares:auth");
const chalk = require("chalk");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization.includes("Bearer")) {
      debug(chalk.redBright("Authorization does not include a token bearer"));
      throw new Error();
    }

    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    debug(chalk.green("Received a valid token"));
    req.userId = id;

    next();
  } catch {
    debug(chalk.redBright("Invalid token"));
    const customError = new Error("invalid token");
    customError.statusCode = 401;

    next(customError);
  }
};

module.exports = auth;
