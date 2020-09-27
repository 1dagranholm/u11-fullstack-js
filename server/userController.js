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
    user.userName = req.body.userName;
    user.password = req.body.password;
    user.role = req.body.role ?? "user";
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

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
            user.userName = req.body.userName ? req.body.userName : user.userName;
            user.password = req.body.password ? req.body.password : user.password;
            user.role = req.body.role ? req.body.role : user.role;
            user.email = req.body.email ? req.body.email : user.email;
            user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
            user.lastName = req.body.lastName ? req.body.lastName : user.lastName;

            user.save(function (err) {
                restApiResponse(err, ["Unable to update user info", "User info updated"], user, res);
            });
        }
    });
};

exports.restore = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            restApiResponse(err, ["No matching user found and therefore unable to restore", ""], user, res);
        } else {
            if (req.body.restore == "true") {
                user.deletedAt = undefined;
            }

            user.save(function (err) {
                restApiResponse(
                    err,
                    [`Unable to restore user ${req.params.user_id}`, `User ${req.params.user_id} is now restored`],
                    user,
                    res
                );
            });
        }
    });
};

exports.delete = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            restApiResponse(err, ["No matching user found and therefore unable to deactivate", ""], user, res);
        } else {
            user.deletedAt = new Date();

            user.save(function (err) {
                restApiResponse(
                    err,
                    [`Unable to delete user ${req.params.user_id}`, `User ${req.params.user_id} is now deleted`],
                    user,
                    res
                );
            });
        }
    });
};
