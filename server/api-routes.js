// Initialize express router
let router = require("express").Router();

// Set default API response
router.get("/", function (req, res) {
    res.json({
        status: "API Its Working",
        message: "The API works.",
    });
});

module.exports = router;
