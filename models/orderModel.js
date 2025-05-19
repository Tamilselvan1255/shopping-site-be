const mongoose = require("mongoose");
const moment = require("moment-timezone");

const orderInfo = new mongoose.Schema({
    phoneNumber: {type: String, required: [true, "Phone number is required"]},
    product_id: {type: String, required: [true, "ID of the product is required"]},
    quantity: {type: Number, required: [true, "Product quantity is required"]},
    address: {type: String, required: [true, "Address is required"]}
}, {
    timestamps: {
        currentTime: () => moment.tz("Asia/Kolkata").toDate()
    }
});

const orderModel = mongoose.model("order", orderInfo);
module.exports = orderModel;