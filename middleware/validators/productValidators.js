const jwt = require('jsonwebtoken');

const addProductValidator = (req, res, next) => {
    const {product_name, price, quantity, description, brand, token} = req.body;
    if(!product_name || !price || !quantity || !token){
        return res.status(400).send({error: "Please fill all required fields!"});
    };

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).send({ error: "Unauthorized user!" });
    }
};

const productTokenValidator = (req, res, next) => {
    const {token} = req.body;
    if(!token){
        return res.status(400).send({error: "Token is required!"});
    }

  try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).send({ error: "Unauthorized user!" });
    }
}

module.exports = {addProductValidator, productTokenValidator}