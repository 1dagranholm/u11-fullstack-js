const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    password: {
      type: 'string',
      pattern: '^(?:\\d+|[a-zA-Z]+|[!@#$%^&*]+)$',
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
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
