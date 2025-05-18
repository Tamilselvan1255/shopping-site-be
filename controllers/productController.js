const productModel = require("../models/productModel");
const { sendSuccess, sendError } = require("../middleware/responseHandler");

const addProduct = async (req, res) => {
  const { product_name, price, quantity, description, brand, token } = req.body;
  try {
    const imagePaths = req.files?.map(file => file.path) || [];

    const product = await productModel.create({
      ...req.body,
      product_images: imagePaths,
    });
    if (product) {
      return sendSuccess(res, "Product added successfully!", {
        imagePaths,
      });
    }
  } catch (error) {
    console.error("Error while adding product:", error.message);
    sendError(res, "", 500);
  }
};

const updateProduct = async (req, res) => {
  const { product_id } = req.params;
  const { product_name, price, quantity, description, brand } = req.body;
  try {
    const existProduct = await productModel.findOne({ _id: product_id });
    if (!existProduct) {
      return sendError(res, "Product not found", 404);
    }

    
    const imagePaths = req.files?.map(file => file.path) || existProduct.product_images;

    await productModel.findOneAndUpdate(
      { _id: product_id },
      {
        product_name: product_name || existProduct.product_name,
        price: price || existProduct.price,
        quantity: quantity || existProduct.quantity,
        description: description || existProduct.description,
        brand: brand || existProduct.brand,
        product_images: imagePaths
      }
    );

    sendSuccess(res, "Product updated successfully!", {
      imagePaths
    });
  } catch (error) {
    console.error("Error while updating product:", error.message);
    sendError(res, "", 500);
  }
};

const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  try {
    const existProduct = await productModel.findOneAndDelete({
      _id: product_id,
    });
    if (!existProduct) {
      return sendError(res, "Product not found!", 404);
    }
    sendSuccess(res, "Product deleted successfully!", {}, 200);
  } catch (error) {
    console.error("Error while deleting product:", error.message);
    a;
    sendError(res, "", 500);
  }
};

const viewProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    sendSuccess(res, "", { products, totalProducts: products.length });
  } catch (error) {
    console.error("Error while fetching products", error.message);
    sendError(res, "", 500);
  }
};

module.exports = { addProduct, updateProduct, deleteProduct, viewProducts };
