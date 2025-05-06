const express = require("express");
const productModel = require("../models/productModel");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/addProduct", upload.single("product_image"), async(req, res)=>{
    const {product_name, price, quantity, description, brand} = req.body;
    if(!product_name || !price){
        return res.status(400).send({error: "Please fill required fields!"});
    }
    try{
        const product = await productModel.create({...req.body, product_image: req.file ? req.file.path : null});
        if(product){
            res.status(200).send({status: "Success", message: "Product added successfully!", imagePath: req.file ? req.file.path : null});
        }
    }catch(error){
        console.error("Error while adding product:", error.message);
        res.status(500).send({error: "Internal server error"});
    }
});

router.patch("/updateProduct/:product_id", upload.single("product_image"), async(req, res) => {
  const {product_id} = req.params;
  const {product_name, price, quantity, description, brand} = req.body;
  try{
    const existProduct = await productModel.findOne({_id: product_id});
    if(!existProduct){
      return res.status(404).send({error: "Product not found!"});
    }
    await productModel.findOneAndUpdate({_id: product_id}, {product_name: product_name || existProduct.product_name, price: price || existProduct.price, quantity: quantity || existProduct.quantity, description: description || existProduct.description, brand: brand || existProduct.brand, product_image: req.file ? req.file.path : existProduct.product_image});

    res.status(200).send({status: "Success", message: "Product updated successfully!", imagePath: req.file ? req.file.path : null})
  }catch(error){
    console.error("Error while updating product:", error.message);
    res.status(500).send({error: "Internal server error"});
  }
});
  
router.delete("/deleteProduct/:product_id", async(req, res) => {
  const {product_id} = req.params;
  try{
    const existProduct = await productModel.findOneAndDelete({_id: product_id});
    if(!existProduct){
      return res.status(404).send({status: "Fail", message: "Product not found!"});
    }
    res.status(200).send({status: "Success", message: "Product deleted successfully!"});
  }catch(error){
    console.error("Error while deleting product:", error.message);
    res.status(500).send({error: "Internal server error"});
  }
});

router.get("/viewProducts", async(req, res) => {
  try{  
    const products = await productModel.find();
    res.status(200).send({data: products, totalProducts: products.length});
    
  }catch(error){
    console.error("Error while fetching products", error.message);
    res.status(500).send({error: "Internal server error"});
  }
});

module.exports = router;