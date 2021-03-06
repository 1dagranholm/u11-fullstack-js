const Todo = require('../models/todoModel');
const { restApiResponse } = require('../utils/api-utils');

// Retrieve user via index action
exports.index = function (req, res) {
  Todo.get((err, todos) => {
    restApiResponse(
      err,
      ['Error occured while fetching todos', 'All existing todos retrieved successfully'],
      todos,
      res,
    );
  });
};

exports.userTodos = async function (req, res) {
  await Todo.find({ ownerId: req.params.owner_id })
    .sort({ createdAt: -1 })
    .then((todos) => {
      res.send(todos);
    })
    .catch((error) => {
      res.status(500).send({
        message: `Failed to fetch todos from user ${req.params.owner_id}`,
        success: true,
        result: error,
      });
    });
};

exports.new = function (req, res) {
  const todo = new Todo();
  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.ownerId = req.body.ownerId;

  todo.save((err) => {
    restApiResponse(err, ['Unable to save new todo', 'New todo created!'], todo, res);
  });
};

exports.view = function (req, res) {
  Todo.findById(req.params.todo_id, (err, data) => {
    const todo = data;
    restApiResponse(err, ['No todos retrieved', 'Todo details loaded'], todo, res);
  });
};

exports.update = function (req, res) {
  Todo.findById(req.params.todo_id, (err, data) => {
    const todo = data;
    if (err) {
      restApiResponse(err, ['No matching todo found and therefore unable to update', ''], '', res);
    } else {
      todo.title = req.body.title ? req.body.title : todo.title;
      todo.description = req.body.description ? req.body.description : todo.description;

      if (req.body.completed === 'true') {
        todo.completed_at = new Date();
      } else {
        todo.completed_at = undefined;
      }

      todo.save((saveErr) => {
        restApiResponse(saveErr, ['Unable to update todo info', 'Todo info updated'], todo, res);
      });
    }
  });
};

exports.complete = function (req, res) {
  Todo.findById(req.params.todo_id, (err, data) => {
    console.log(data);
    const todo = data;
    if (err) {
      restApiResponse(err, ['No matching todo found and therefore unable to complete', ''], todo, res);
    } else {
      todo.completedAt = new Date();

      todo.save((saveErr) => {
        restApiResponse(
          saveErr,
          [`Unable to complete todo ${req.params.todo_id}`, `Todo ${req.params.todo_id} is now completed`],
          todo,
          res,
        );
      });
    }
  });
};

exports.activate = function (req, res) {
  Todo.findById(req.params.todo_id, (err, data) => {
    const todo = data;
    if (err) {
      restApiResponse(err, ['No matching todo found and therefore unable to restore', ''], todo, res);
    } else {
      if (req.body.activate === 'true') {
        todo.completedAt = undefined;
      }

      todo.save((saveErr) => {
        restApiResponse(
          saveErr,
          [`Unable to uncomplete todo ${req.params.todo_id}`, `Todo ${req.params.todo_id} is now active again`],
          todo,
          res,
        );
      });
    }
  });
};

exports.restore = function (req, res) {
  Todo.findById(req.params.todo_id, (err, data) => {
    const todo = data;
    if (err) {
      restApiResponse(err, ['No matching todo found and therefore unable to restore', ''], todo, res);
    } else {
      if (req.body.restore === 'true') {
        todo.deletedAt = undefined;
      }

      todo.save((saveErr) => {
        restApiResponse(
          saveErr,
          [`Unable to restore todo ${req.params.todo_id}`, `Todo ${req.params.todo_id} is now restored`],
          todo,
          res,
        );
      });
    }
  });
};

exports.delete = function (req, res) {
  Todo.findById(req.params.todo_id, (err, data) => {
    const todo = data;
    if (err) {
      restApiResponse(err, ['No matching todo found and therefore unable to delete', ''], todo, res);
    } else {
      todo.deletedAt = new Date();

      todo.save((saveErr) => {
        restApiResponse(
          saveErr,
          [`Unable to delete todo ${req.params.todo_id}`, `Todo ${req.params.todo_id} is now deleted`],
          todo,
          res,
        );
      });
    }
  });
};

exports.search = async function (req, res) {
  const searchTerm = new RegExp(req.body.term, 'i');

  await Todo.find()
    .or([{ title: searchTerm }, { description: searchTerm }])
    .sort({ createdAt: -1 })
    .then((todos) => {
      res.send(todos);
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Failed: to search via index',
        success: true,
        result: error,
      });
    });
};

exports.searchUserTodos = async function (req, res) {
  const searchTerm = new RegExp(req.body.term, 'i');
  const userId = req.params.user_id;

  await Todo.find()
    .and({ ownerId: userId })
    .or([{ title: searchTerm }, { description: searchTerm }])
    .sort({ createdAt: -1 })
    .then((todos) => {
      res.send(todos);
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Failed: to search via index',
        success: true,
        result: error,
      });
    });
};
