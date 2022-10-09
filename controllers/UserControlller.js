const asyncHandler = require('express-async-handler');
const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    message: `Success`,
    data: { users },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: 'Server Erorr | this route is not yet defind 🧱',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: 'Server Erorr | this route is not yet defind 🧱',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: 'Server Erorr | this route is not yet defind 🧱',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: 'Server Erorr | this route is not yet defind 🧱',
  });
};
