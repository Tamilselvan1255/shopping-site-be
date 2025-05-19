const { sendError, sendSuccess } = require("../middleware/responseHandler");
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const login = async(req, res) => {
    const {typeOfUser, userName, password} = req.body;
    try{
        const token = jwt.sign({userName, password}, process.env.JWT_SECRET);
        if(typeOfUser === "admin"){
            if(userName === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
                sendSuccess(res, "User loggedin successfully!", {token})
            } else {
                sendError(res, "Invalid credentials!", 400)
            }
        } else if(typeOfUser === "customer"){
            const existUser = await userModel.findOne({userName});
            if(!existUser){
                sendError(res, "Customer not found!", 404);
            }

            const decPassword = await bcrypt.compare(password, existUser.password);
            console.log(decPassword);
            if(decPassword){
                  sendSuccess(res, "User loggedin successfully!", {token, existUser})
            } else {
                sendError(res, "Invalid credentials!", 400)
            }
        }
    }catch(error){
        console.error("Error while login:", error.message);
        sendError(res, "", 500);
    }
};

module.exports = {login}