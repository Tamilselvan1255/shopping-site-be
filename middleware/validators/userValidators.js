const jwt = require("jsonwebtoken");

const createUserValidator = (req, res, next) => {
  const { userName, phoneNumber, email } = req.body;
  const authHeader = req.headers.authorization;

  if (!userName || !phoneNumber || !email) {
    return res.status(400).send({ error: "Please fill required fields!" });
  }

  
  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized user!" });
  }
};

const userTokenValidator = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized user!" });
  }
};

module.exports = { createUserValidator, userTokenValidator };
