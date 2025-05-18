const jwt = require("jsonwebtoken");

const orderValidator = (req, res, next) => {
  const { phoneNumber, product_id, quantity } = req.body;
  const authHeader = req.headers.authorization;

  if (!phoneNumber || !product_id || !quantity) {
    return res
      .status(400)
      .send({ sattus: "Fail", error: "Please fill required fields!" });
  }

  try {
      const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized user!" });
  }
};

const viewOrderValidator = (req, res, next) => {
  const { phoneNumber} = req.query;
  const authHeader = req.headers.authorization;

  if (!phoneNumber) {
    return res
      .status(400)
      .send({ status: "Fail", error: "Phone number is required" });
  }

  try {
      const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized user!" });
  }
};

module.exports = { orderValidator, viewOrderValidator };
