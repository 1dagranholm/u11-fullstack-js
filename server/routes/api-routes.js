const router = require('express').Router();
const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const authController = require("../controllers/authController");

// Set default API response
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'The API works!',
  });
});

const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');
const roleController = require('../controllers/roleController');

// User routes
router.route('/users').get([authJwt.verifyToken, authJwt.isAdmin], userController.index).post([authJwt.verifyToken, authJwt.isAdmin], userController.new);
router.route('/users/:user_id').get([authJwt.verifyToken], userController.view).patch([authJwt.verifyToken], userController.update).delete([authJwt.verifyToken], userController.delete);
router.route('/users/roles/:role_id').get([authJwt.verifyToken, authJwt.isAdmin], userController.filterUsersByRoleId);
router.route('/users/todos/:owner_id').get([authJwt.verifyToken], todoController.userTodos);

// Role routes
router.route('/roles').get([authJwt.verifyToken, authJwt.isAdmin], roleController.index);

// Todo routes
router.route('/todos').get([authJwt.verifyToken, authJwt.isAdmin], todoController.index).post([authJwt.verifyToken, authJwt.isAdmin], todoController.new);
router.route('/todos/:todo_id').get([authJwt.verifyToken], todoController.view).patch([authJwt.verifyToken], todoController.update).delete([authJwt.verifyToken], todoController.delete);

// Complete/uncomplete todos
router.route('/complete/todos/:todo_id').patch([authJwt.verifyToken], todoController.complete);
router.route('/activate/todos/:todo_id').patch([authJwt.verifyToken], todoController.activate)

// Restore removed users/todos
router.route('/restore/users/:user_id').patch([authJwt.verifyToken, authJwt.isAdmin], userController.restore);
router.route('/restore/todos/:todo_id').patch([authJwt.verifyToken, authJwt.isAdmin], todoController.restore);

// Search routes
router.route('/search/users').post([authJwt.verifyToken, authJwt.isAdmin], userController.search);
router.route('/search/todos').post([authJwt.verifyToken, authJwt.isAdmin], todoController.search);
router.route('/search/todos/:user_id').post([authJwt.verifyToken, authJwt.isAdmin], todoController.searchUserTodos);


// Test authorities routes
router.route("/test/all").get([authJwt.verifyToken], userController.allAccess);
router.route("/test/user").get([authJwt.verifyToken], userController.userBoard);

  router.route(
  '/test/admin').get(
  [
    authJwt.verifyToken, 
    authJwt.isAdmin
  ], userController.adminBoard);

// Auth signup route
router.route('/auth/signup').post(
  [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRolesExisted
  ], authController.signup);

// Auth signin route
router.route('/auth/signin').post(authController.signin);

module.exports = router;
