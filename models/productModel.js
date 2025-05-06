const mongoose = require("mongoose");
const moment = require("moment-timezone");

const productInfo = new mongoose.Schema({
    product_name: {type: String, required: [true, "Name of product is required"]},
    price: {type: Number, required: [true, "Price of product is required"]},
    description: {type: String},
    brand: {type: String},
    quantity: {type:Number, required: [true, "Quantity of the product is required"]},
    product_image: {type: String}
}, {
    timestamps: {
        currentTime: () => moment.tz("Asia/Kolkata").toDate()
    }
});

const productModel = mongoose.model("product", productInfo);
module.exports = productModel;