const router = require('express').Router();

// Set default API response
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'The API works!',
  });
});

const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');

// User routes
router.route('/users').get(userController.index).post(userController.new);
router.route('/users/:user_id').get(userController.view).patch(userController.update).delete(userController.delete);

// Todo routes
router.route('/todos').get(todoController.index).post(todoController.new);
router.route('/todos/:todo_id').get(todoController.view).patch(todoController.update).delete(todoController.delete);

// Restore removed users/todos
router.route('/restore/users/:user_id').patch(userController.restore);
router.route('/restore/todos/:todo_id').patch(todoController.restore);

// Search routes
router.route('/search/users').post(userController.search);
router.route('/search/todos').post(todoController.search);

module.exports = router;
