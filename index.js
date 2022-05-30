require("dotenv").config();
const debug = require("debug")("reserve:root");
const chalk = require("chalk");
const connectDb = require("./src/server/db");
const initialServer = require("./src/server/initalServer");

(async () => {
  try {
    await initialServer(process.env.PORT || 4000);
    await connectDb(process.env.MONGO_STRING);
    debug(chalk.blue("you are connect"));
  } catch (error) {
    debug(chalk.red("Error to Connect"));
  }
})();
