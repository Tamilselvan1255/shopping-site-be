const jwt = require("jsonwebtoken");

const createUserValidator = (req, res, next) => {
  const { userName, phoneNumber, email, token } = req.body;
  if (!userName || !phoneNumber || !email || !token) {
    return res.status(400).send({ error: "Please fill required fields!" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized user!" });
  }
};

const userTokenValidator = (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({ error: "Token is required!" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized user!" });
  }
};

module.exports = { createUserValidator, userTokenValidator };
