const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.role = require("./roleModel");
db.todo = require("./todoModel");

db.ROLES = ["user", "admin", "superadmin"];

module.exports = db;