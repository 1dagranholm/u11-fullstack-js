var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    user_name: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        pattern: "^(?:\\d+|[a-zA-Z]+|[!@#$%^&*]+)$",
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
});

var User = (module.exports = mongoose.model("user", userSchema));

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};
