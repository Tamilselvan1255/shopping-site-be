const jwt = require('jsonwebtoken');

const addProductValidator = (req, res, next) => {
    const {product_name, price, quantity, description, brand} = req.body;
  const authHeader = req.headers.authorization;

    if(!product_name || !price || !quantity){
        return res.status(400).send({error: "Please fill all required fields!"});
    };

    try {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).send({ error: "Unauthorized user!" });
    }
};

const productTokenValidator = (req, res, next) => {
      const authHeader = req.headers.authorization;

  try {
    const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).send({ error: "Unauthorized user!" });
    }
}

module.exports = {addProductValidator, productTokenValidator}