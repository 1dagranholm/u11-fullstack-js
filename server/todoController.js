Todo = require("./todoModel");
const { restApiResponse } = require("./helpers");

// Retrieve user via index action
exports.index = function (req, res) {
    Todo.get(function (err, todos) {
        restApiResponse(
            err,
            ["Error occured while fetching todos", "All existing todos retrieved successfully"],
            todos,
            res
        );
    });
};

exports.new = function (req, res) {
    var todo = new Todo();
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.ownerId = req.body.ownerId;

    todo.save(function (err) {
        restApiResponse(err, ["Unable to save new todo", "New todo created!"], todo, res);
    });
};

exports.view = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        restApiResponse(err, ["No todos retrieved", "Todo details loaded"], todo, res);
    });
};

exports.update = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            restApiResponse(err, ["No matching todo found and therefore unable to update", ""], "", res);
        } else {
            todo.title = req.body.title ? req.body.title : todo.title;
            todo.description = req.body.description ? req.body.description : todo.description;

            if (req.body.completed == "true") {
                todo.completed_at = new Date();
            } else {
                todo.completed_at = undefined;
            }

            todo.save(function (err) {
                restApiResponse(err, ["Unable to update todo info", "Todo info updated"], todo, res);
            });
        }
    });
};

exports.restore = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            restApiResponse(err, ["No matching todo found and therefore unable to restore", ""], todo, res);
        } else {
            if (req.body.restore == "true") {
                todo.deletedAt = undefined;
            }

            todo.save(function (err) {
                restApiResponse(
                    err,
                    [`Unable to restore todo ${req.params.todo_id}`, `Todo ${req.params.todo_id} is now restored`],
                    todo,
                    res
                );
            });
        }
    });
};

exports.delete = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            restApiResponse(err, ["No matching todo found and therefore unable to delete", ""], todo, res);
        } else {
            todo.deletedAt = new Date();

            todo.save(function (err) {
                restApiResponse(
                    err,
                    [`Unable to delete todo ${req.params.todo_id}`, `Todo ${req.params.todo_id} is now deleted`],
                    todo,
                    res
                );
            });
        }
    });
};
