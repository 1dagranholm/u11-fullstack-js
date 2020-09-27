User = require("./userModel");
const { restApiResponse } = require("./helpers");

// Retrieve all users
exports.index = function (req, res) {
    User.get(function (err, users) {
        restApiResponse(
            err,
            ["Error occured while fetching users", "All existing users retrieved successfully"],
            users,
            res
        );
    });
};

exports.new = function (req, res) {
    var user = new User();
    user.user_name = req.body.user_name;
    user.password = req.body.password;
    user.role = req.body.role ?? "user";
    user.email = req.body.email;
    user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
    user.last_name = req.body.last_name ? req.body.last_name : user.last_name;

    user.save(function (err) {
        restApiResponse(err, ["Unable to save new user", "New user created!"], user, res);
    });
};

exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        restApiResponse(err, ["No user retrieved", "User details loaded"], user, res);
    });
};

exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            restApiResponse(err, ["No matching user found and therefore unable to update", ""], "", res);
        } else {
            user.user_name = req.body.user_name;
            user.password = req.body.password;
            user.role = req.body.role;
            user.email = req.body.email;
            user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
            user.last_name = req.body.last_name ? req.body.last_name : user.last_name;

            user.save(function (err) {
                restApiResponse(err, ["Unable to update user info", "User info updated"], user, res);
            });
        }
    });
};

exports.delete = function (req, res) {
    User.deleteOne(
        {
            _id: req.params.user_id,
        },
        function (err) {
            restApiResponse(err, ["No matching user found and therefore unable to delete", "User deleted"], user, res);
        }
    );
};
