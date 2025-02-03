const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
require("express-async-errors");
const blogRouter = require("./controllers/blogs");

const mongoUrl = config.MONGODB_URI;

logger.info("connecting to", mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
