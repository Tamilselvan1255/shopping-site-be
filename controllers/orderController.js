const express = require("express");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const router = express.Router();

router.post("/makeOrder", async(req, res) => {
  const {phoneNumber, product_id, quantity} = req.body;
  if(!phoneNumber || !product_id || !quantity){
    return res.status(400).send({sattus: "Fail", error: "Please fill required fields!"});
  }
  try{
    const existUser = await userModel.findOne({phoneNumber});
    if(!existUser){
      return res.status(404).send({status: "Fail", error: "User not found!"})
    }

    const existProduct = await productModel.findOne({_id: product_id, quantity: {$gt: 0}});
    if(!existProduct){
      return res.status(404).send({status: "Fail", error: "Product not found"});
    }

    await orderModel.create({
      ...req.body
    });
    res.status(200).send({status: "Success", message: "Order created successfully!"})
  }catch(error){
    console.error("Error while order the product:", error.message);
    res.status(500).send({error: "Internal server error"});
  }
});

router.get("/viewMyOrders", async(req, res) => {
    const {phoneNumber} = req.query;
    if(!phoneNumber){
        return res.status(400).send({status: "Fail", error: "Phone number is required"});
    };
    try{
        const orders = await orderModel.find({phoneNumber});
        if(orders.length === 0){
            return res.status(404).send({error: "You've no orders"});
        }

        const myOrders = await Promise.all(
            orders.map(async(data) => {
                const products = await productModel.findOne({_id: data.product_id});
                return { ...data._doc, product: products };
            })
        )
        res.status(200).send({data: myOrders, totalOrders: orders.length})

    }catch(error){
        console.error("Error while fetching order details:", error.message);
        res.status(500).send({error: "Internal server error"});
    }
});

module.exports = router;