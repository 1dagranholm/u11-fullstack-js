const router = require("express").Router();

// Set default API response
router.get("/", function (req, res) {
    res.json({
        status: "success",
        message: "The API works!",
    });
});

const userController = require("./userController");
const todoController = require("./todoController");

// User routes
router.route("/users").get(userController.index).post(userController.new);
router.route("/users/:user_id").get(userController.view).patch(userController.update).delete(userController.delete);
router.route("/users/restore/:user_id").patch(userController.restore);

// Todo routes
router.route("/todos").get(todoController.index).post(todoController.new);
router.route("/todos/:todo_id").get(todoController.view).patch(todoController.update).delete(todoController.delete);
router.route("/todos/restore/:todo_id").patch(todoController.restore);

// Search routes
router.route("/search/users").post(userController.search);
router.route("/search/todos").post(todoController.search);

module.exports = router;
