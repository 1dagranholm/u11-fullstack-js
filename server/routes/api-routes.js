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
router.route('/users').get(userController.index).post(userController.new);
router.route('/users/:user_id').get(userController.view).patch(userController.update).delete(userController.delete);
router.route('/users/roles/:role_id').get(userController.filterUsersByRoleId);

// Role routes
router.route('/roles').get(roleController.index);

// Todo routes
router.route('/todos').get(todoController.index).post(todoController.new);
router.route('/todos/:todo_id').get(todoController.view).patch(todoController.update).delete(todoController.delete);

// Restore removed users/todos
router.route('/restore/users/:user_id').patch(userController.restore);
router.route('/restore/todos/:todo_id').patch(todoController.restore);

// Search routes
router.route('/search/users').post(userController.search);
router.route('/search/todos').post(todoController.search);


// Test authorities routes

router.route("/test/all").get(userController.allAccess);
router.route("/test/user").get([authJwt.verifyToken], userController.userBoard);

router.route('/test/superadmin').get(
  [
    authJwt.verifyToken, 
    authJwt.isSuperAdmin
  ], userController.superAdminBoard);

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
