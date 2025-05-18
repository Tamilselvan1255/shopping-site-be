const express = require("express");
const { addProduct, updateProduct, deleteProduct, viewProducts } = require("../controllers/productController");
const upload = require("../middleware/upload");
const { addProductValidator, productTokenValidator } = require("../middleware/validators/productValidators");
const router = express.Router();

router.post("/addProduct", upload.array("product_images", 5), addProductValidator, addProduct);
router.patch("/updateProduct/:product_id", upload.array("product_images", 5), productTokenValidator, updateProduct);
router.delete("/deleteProduct/:product_id", productTokenValidator, deleteProduct);
router.get("/viewProducts", productTokenValidator, viewProducts);

module.exports = router;