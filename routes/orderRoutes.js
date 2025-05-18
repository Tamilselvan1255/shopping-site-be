const express = require("express");
const { makeOrder, viewMyOrders } = require("../controllers/orderController");
const { orderValidator, viewOrderValidator } = require("../middleware/validators/orderValidators");
const router = express.Router();

router.post("/makeOrder", orderValidator, makeOrder);
router.get("/viewMyOrders", viewOrderValidator, viewMyOrders);

module.exports = router;
