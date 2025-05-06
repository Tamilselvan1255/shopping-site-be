const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userInfo = new mongoose.Schema({
    userName: {type: String, required: [true, "User name is required"]},
    phoneNumber: {type: String, required: [true, "Phone number is required"], match: [/^\d{10}$/, "Please enter valid phonenumber!"]},
    email: {type: String, required: [true, "Email is required"]},
}, {
    timestamps: {currentTime: () => moment.tz("Asia/Kolkata").toDate()}
});

const userModel = mongoose.model("user", userInfo);
module.exports = userModel;