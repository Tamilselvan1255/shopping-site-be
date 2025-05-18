const express = require("express");
const { createUser, updateUser, deleteUser } = require("../controllers/userController");
const { createUserValidator, userTokenValidator } = require("../middleware/validators/userValidators");
const { login } = require("../controllers/authController");
const router = express.Router();

router.post("/createUser", createUserValidator, createUser);
router.patch("/updateUser/:id", userTokenValidator, updateUser);
router.delete("/deleteUser/:id", userTokenValidator, deleteUser);

router.post("/login", login);
 
module.exports = router;