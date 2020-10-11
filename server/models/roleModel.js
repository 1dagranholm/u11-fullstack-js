const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    name: String
  }
);

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;

module.exports.get = function (callback, limit) {
  Role.find(callback).limit(limit);
};
