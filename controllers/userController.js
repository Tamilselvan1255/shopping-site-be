const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();

router.post("/createUser", async(req, res) => {
    const {userName, phoneNumber, email} = req.body;
    if(!userName || !phoneNumber || !email){
        return res.status(400).send({error: "Please fill required fields!"});
    }
    try{
        const existUser = await userModel.findOne({phoneNumber});
        if(existUser){
            return res.status(400).send({error: "User already exists!"});
        }

        const data = await userModel.create({...req.body});
        if(data){
            res.status(200).send({status: "Success", message: "Customer created successfully!"})
        }
    }catch(error){
        console.error("Error while creating customer:", error.message);
        res.status(500).send({error: "Internal server error"});
    }
});

router.patch("/updateUser/:id", async(req, res) => {
    const id = req.params.id;
    const {userName, email} = req.body;
    try{
        const existUser = await userModel.findOneAndUpdate({_id: id}, {userName, email}, {new: true});
        if(!existUser){
            return res.status(404).send({error: "User not found!"})
        }
        res.status(200).send({status: "Success", message: "User updated successfully!"})

    }catch(error){
        console.error("Error while updating user:", error.message);
        res.status(500).send({error: "Internal server error"});
    }
});

router.delete("/deleteUser/:id", async(req, res) => {
    const id = req.params.id;
    try{
        const existUser = await userModel.findOneAndDelete({_id: id});
        if(!existUser){
            return res.status(404).send({error: "User not found!"})
        }
        res.status(200).send({status: "Success", message: "User deleted successfully!"});
    }catch(error){
        console.error("Error while deleting user:", error.message);
        res.status(500).send({error: "Internal server error"});
    }
});

module.exports = router;