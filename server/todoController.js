Todo = require("./todoModel");

// Retrieve user via index action
exports.index = function (req, res) {
    Todo.get(function (err, todos) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else if (todos == 0) {
            res.json({
                status: "error",
                message: "There's no todos to retrieve",
            });
        } else {
            res.json({
                status: "success",
                message: "Todos retrieved successfully",
                data: todos,
            });
        }
    });
};

exports.new = function (req, res) {
    var todo = new Todo();
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.owner_id = req.body.owner_id;

    todo.save(function (err) {
        if (err) {
            res.json({
                status: "error",
                message: "Unable to save new todo",
            });
        } else {
            res.json({
                status: "success",
                message: "New todo created!",
                data: todo,
            });
        }
    });
};

exports.view = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            res.json({
                status: "error",
                message: "No todo retrieved",
            });
        } else {
            res.json({
                status: "success",
                message: "Todo details loading...",
                data: todo,
            });
        }
    });
};

exports.update = function (req, res) {
    Todo.findById(req.params.user_id, function (err, todo) {
        if (err) {
            res.json({
                status: "error",
                message: "No matching todo found and therefore unable to update",
            });
        } else {
            todo.title = req.body.title;
            todo.description = req.body.description;
            todo.completed = req.body.completed;

            todo.save(function (err) {
                if (err) {
                    res.json({
                        status: "error",
                        message: "Unable to update todo",
                    });
                } else {
                    res.json({
                        status: "success",
                        message: "Todo info updated",
                        data: todo,
                    });
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    Todo.deleteOne(
        {
            _id: req.params.todo_id,
        },
        function (err) {
            if (err) {
                res.json({
                    status: "error",
                    message: "No matching todo found and therefore unable to delete",
                });
            } else {
                res.json({
                    status: "success",
                    message: "Todo deleted",
                });
            }
        }
    );
};
