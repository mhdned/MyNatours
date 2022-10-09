const User = require('./../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECURE_PK, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.signUp = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(currentUser._id);
  // RESPONSE
  res.status(201).json({
    result: 'Success',
    token,
    data: newUser,
  });
});

exports.logginUser = asyncHandler(async (req, res, next) => {
  let { password, email } = req.body;

  if (!password || !email) {
    throw new Error('Error 💥| Please enter password and email');
  }
  const currentUser = await User.findOne({ email }).select('+password');
  if (
    !currentUser ||
    !(await currentUser.comparePassword(password, currentUser.password))
  ) {
    throw new Error('Error 💥| user not exist or password wrong');
  }
  const token = signToken(currentUser._id);

  res.status(200).json({
    result: 'Success',
    token,
  });
});
