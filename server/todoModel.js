const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
    {
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        completedAt: {
            type: Date,
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Todo = (module.exports = mongoose.model("Todo", todoSchema));

module.exports.get = function (callback, limit) {
    Todo.find(callback).limit(limit);
};
