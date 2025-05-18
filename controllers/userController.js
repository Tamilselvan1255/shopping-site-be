const userModel = require("../models/userModel");
const { sendError, sendSuccess } = require("../middleware/responseHandler");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { userName, phoneNumber, email, password, token } = req.body;
  try {
    const existUser = await userModel.findOne({ phoneNumber });
    if (existUser) {
      return sendError(res, "User already exists!", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const data = await userModel.create({ ...req.body });
    if (data) {
      sendSuccess(res, "Customer created successfully!", {});
    }
  } catch (error) {
    console.error("Error while creating customer:", error.message);
    sendError(res, "", 500);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, token } = req.body;
  try {
    const existUser = await userModel.findOneAndUpdate(
      { _id: id },
      { email },
      { new: true }
    );
    if (!existUser) {
      return sendError(res, "User not found!", 404);
    }

    sendSuccess(res, "User updated successfully", {});
  } catch (error) {
    console.error("Error while updating user:", error.message);
    sendError(res, "", 500);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { token } = req.body;
  try {
    const existUser = await userModel.findOneAndDelete({ _id: id });
    if (!existUser) {
      return sendError(res, "User not found!", 404);
    }

    sendSuccess(res, "User deleted successfully!", {});
  } catch (error) {
    console.error("Error while deleting user:", error.message);
    sendError(res, "", 500);
  }
};

module.exports = { createUser, updateUser, deleteUser };
