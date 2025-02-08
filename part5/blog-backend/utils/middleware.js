const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    logger.error(error.message);
  }

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.message.includes("E11000 duplicate key error collection")) {
    return res.status(400).json({ error: "username must be unique" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    request.token = null;
  } else {
    request.token = authHeader.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (!token) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  const userId = decodedToken.id;

  request.user = await User.findById(userId);

  if (!request.user) {
    return response.status(401).json({ error: "User not found" });
  }

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
