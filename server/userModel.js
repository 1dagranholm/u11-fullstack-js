const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    userName: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      pattern: '^(?:\\d+|[a-zA-Z]+|[!@#$%^&*]+)$',
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
module.exports = User;

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};
