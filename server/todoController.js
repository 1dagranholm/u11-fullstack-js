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
    todo.owner_id = req.body.owner_id;

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
    Todo.findById(req.params.user_id, function (err, todo) {
        if (err) {
            restApiResponse(err, ["No matching todo found and therefore unable to update", ""], "", res);
        } else {
            todo.title = req.body.title;
            todo.description = req.body.description;

            todo.save(function (err) {
                restApiResponse(err, ["Unable to update todo info", "Todo info updated"], todo, res);
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
            restApiResponse(err, ["No matching todo found and therefore unable to delete", "Todo deleted"], todo, res);
        }
    );
};
