const router = require("express").Router();

// Set default API response
router.get("/", function (req, res) {
    res.json({
        status: "API Its Working",
        message: "The API works.",
    });
});

const userController = require("./userController");
const todoController = require("./todoController");

// User routes
router.route("/users").get(userController.index).post(userController.new);
router
    .route("/users/:user_id")
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

// Todo routes
router.route("/todos").get(todoController.index).post(todoController.new);
router
    .route("/todos/:todo_id")
    .get(todoController.view)
    .patch(todoController.update)
    .put(todoController.update)
    .delete(todoController.delete);

module.exports = router;
