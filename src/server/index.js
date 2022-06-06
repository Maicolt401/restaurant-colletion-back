const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { notFoundError, generalError } = require("./middlewares/errors");
const userRouter = require("./routers/userRouter");
const reservesRouter = require("./routers/reservesRouter");
const auth = require("./middlewares/auth/auth");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/clients", userRouter);
app.use("/reserves", auth, reservesRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
