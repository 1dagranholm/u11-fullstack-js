User = require("./userModel");

// Retrieve user via index action
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users,
        });
    });
};

exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.phone = req.body.phone;

    user.save(function (err) {
        res.json({
            message: "New user created!",
            data: user,
        });
    });
};

exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) res.send(err);
        res.json({
            message: "User details loading...",
            data: user,
        });
    });
};

exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.phone = req.body.phone;

        User.save(function (err) {
            if (err) res.json(err);
            res.json({
                message: "User info updated",
                data: user,
            });
        });
    });
};

exports.delete = function (req, res) {
    User.remove(
        {
            _id: req.params.user_id,
        },
        function (err, user) {
            if (err) res.send(err);
            res.json({
                status: "success",
                message: "User deleted",
            });
        }
    );
};
