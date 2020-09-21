let router = require("express").Router();

// Set default API response
router.get("/", function (req, res) {
    res.json({
        status: "API Its Working",
        message: "The API works.",
    });
});

var userController = require("./userController");

// User routes
router.route("/users").get(userController.index).post(userController.new);
router
    .route("/users/:user_id")
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

module.exports = router;
