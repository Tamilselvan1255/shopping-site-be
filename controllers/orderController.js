const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const { sendError, sendSuccess } = require("../middleware/responseHandler");

const makeOrder = async(req, res) => {
  const {phoneNumber, product_id, quantity, address} = req.body;
  try{
    const existUser = await userModel.findOne({phoneNumber});
    if(!existUser){
     return sendError(res, "User not found!", 404)
    }

    const existProduct = await productModel.findOne({_id: product_id, quantity: {$gt: 0}});
    if(!existProduct){
      return sendError(res, "Product not found!", 404);
    }

    if(existProduct.quantity < quantity){
      return sendError(res, `Only ${existProduct.quantity} items is available`, 400)
    } else {
      existProduct.quantity = existProduct.quantity - quantity;
      await existProduct.save();
    }

    await orderModel.create({
      ...req.body
    });

    return sendSuccess(res, "Order created successfully!", {}, 200);
  }catch(error){
    console.error("Error while order the product:", error.message);
    sendError(res, "", 500);
  }
};

const viewMyOrders = async(req, res) => {
  const {phoneNumber} = req.query;
    try{
        const orders = await orderModel.find({phoneNumber});
        if(orders.length === 0){
            return sendError(res, "You've no orders", 404);
        }

        const myOrders = await Promise.all(
            orders.map(async(data) => {
                const products = await productModel.findOne({_id: data.product_id});
                return { ...data._doc, products };
            })
        )
        sendSuccess(res, "Order fetched successfully", {myOrders, totalOrders: orders.length}, 200 )

    }catch(error){
        console.error("Error while fetching order details:", error.message);
        return sendError(res, "", 500)
    }
};

module.exports = {makeOrder, viewMyOrders};