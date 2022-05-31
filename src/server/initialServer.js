require("dotenv").config();
const debug = require("debug")("reserve:server:initialServer");
const chalk = require("chalk");
const app = require(".");

const initialServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Initialized server on port : ${port}`));
      resolve();
    });

    server.on("error", (error) => {
      debug(chalk.red("Error on server"));
      if (error.code === "EADDRINUSE") {
        debug(`${port} used `);
      }
      reject();
    });
  });

module.exports = initialServer;
