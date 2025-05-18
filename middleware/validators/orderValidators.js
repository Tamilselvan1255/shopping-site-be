const jwt = require("jsonwebtoken");

const orderValidator = (req, res, next) => {
  const { phoneNumber, product_id, quantity, token } = req.body;
  if (!phoneNumber || !product_id || !quantity || !token) {
    return res
      .status(400)
      .send({ sattus: "Fail", error: "Please fill required fields!" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized user!" });
  }
};

const viewOrderValidator = (req, res, next) => {
  const { phoneNumber, token } = req.query;
  if (!phoneNumber || !token) {
    return res
      .status(400)
      .send({ status: "Fail", error: "Phone number is required" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized user!" });
  }
};

module.exports = { orderValidator, viewOrderValidator };
