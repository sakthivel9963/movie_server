const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      min: 4,
      max: 16,
    },
    mobile: {
      type: Number,
    },
    county: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
