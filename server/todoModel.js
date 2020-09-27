const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: "string",
        required: true,
    },
    description: {
        type: "string",
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    created: {
        type: Date,
        default: Date.now,
        required: true,
    },
    completed: {
        type: Date,
        default: Date.now,
    },
});

const Todo = (module.exports = mongoose.model("Todo", todoSchema, "todos"));

module.exports.get = function (callback, limit) {
    Todo.find(callback).limit(limit);
};
