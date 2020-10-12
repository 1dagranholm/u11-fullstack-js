const User = require('../models/userModel');
const { restApiResponse } = require('../utils/api-utils');

const bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("TodoApp - Making your life easier.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("My todos");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin pages");
};

// Retrieve all users
exports.index = function (req, res) {
  User.get((err, users) => {
    restApiResponse(
      err,
      ['Error occured while fetching users', 'All existing users retrieved successfully'],
      users,
      res,
    );
  });
};

exports.filterUsersByRoleId = function (req, res) {
  User.find({ roles: req.params.role_id}, (err, users) => {
    restApiResponse(
      err,
      ['Error occured while fetching users with requested role', 'All existing users with requested role retrieved successfully'],
      users,
      res,
    );
  });
};

exports.new = function (req, res) {
  const user = new User();
  user.password = bcrypt.hashSync(req.body.password, 8);
  user.roles = req.body.roles;
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  user.save((err) => {
    restApiResponse(err, ['Unable to save new user', 'New user created!'], user, res);
  });
};

exports.view = function (req, res) {
  User.findById(req.params.user_id).populate("roles", "-__v").exec( (err, user) => {
    restApiResponse(err, ['No user retrieved', 'User details loaded'], user, res);
  });
};

exports.update = function (req, res) {
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      restApiResponse(err, ['No matching user found and therefore unable to update', ''], '', res);
    } else {
      user.password = req.body.password ? bcrypt.hashSync(req.body.password, 8) : user.password;
      user.roles = req.body.roles ? req.body.roles : user.roles;
      user.email = req.body.email ? req.body.email : user.email;
      user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
      user.lastName = req.body.lastName ? req.body.lastName : user.lastName;

      user.save((saveErr) => {
        restApiResponse(saveErr, ['Unable to update user info', 'User info updated'], user, res);
      });
    }
  });
};

exports.restore = function (req, res) {
  User.findById(req.params.user_id, (err, data) => {
    const user = data;
    if (err) {
      restApiResponse(err, ['No matching user found and therefore unable to restore', ''], user, res);
    } else {
      if (req.body.restore === 'true') {
        user.deletedAt = undefined;
      }

      user.save((saveErr) => {
        restApiResponse(
          saveErr,
          [`Unable to restore user ${req.params.user_id}`, `User ${req.params.user_id} is now restored`],
          user,
          res,
        );
      });
    }
  });
};

exports.delete = function (req, res) {
  User.findById(req.params.user_id, (err, data) => {
    const user = data;
    if (err) {
      restApiResponse(err, ['No matching user found and therefore unable to deactivate', ''], data, res);
    } else {
      user.deletedAt = new Date();

      user.save((saveErr) => {
        restApiResponse(
          saveErr,
          [`Unable to delete user ${req.params.user_id}`, `User ${req.params.user_id} is now deleted`],
          user,
          res,
        );
      });
    }
  });
};

exports.search = async function (req, res) {
  const searchTerm = new RegExp(req.body.term, 'i');

  await User.find()
    .or([{ firstName: searchTerm }, { lastName: searchTerm }])
    .sort({ email: 1 })
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Failed: to search via index',
        success: true,
        result: error,
      });
    });
};
