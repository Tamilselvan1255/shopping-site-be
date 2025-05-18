const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userInfo = new mongoose.Schema({
    userName: {type: String},
    phoneNumber: {type: String, match: [/^\d{10}$/, "Please enter valid phonenumber!"]},
    email: {type: String},
    password: {type: String}
}, {
    timestamps: {currentTime: () => moment.tz("Asia/Kolkata").toDate()}
});

const userModel = mongoose.model("user", userInfo);
module.exports = userModel;