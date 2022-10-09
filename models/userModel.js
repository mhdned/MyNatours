const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: [true, `Name field must be unique`],
    maxLength: [80, `Name field must be more than or equal 80`],
    require: true,
  },
  email: {
    type: String,
    lowercase: true,
    require: true,
    unique: [true, `Name field must be unique`],
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
      message: `Please provid a valid email`,
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
    minLength: [8, `Password field must be less than or equal 8`],
  },
  passwordConfirm: {
    type: String,
    require: true,
    minLength: [8, `Password field must be less than or equal 8`],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: `password confirm is wrong`,
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
