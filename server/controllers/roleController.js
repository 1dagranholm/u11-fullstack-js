const Role = require('../models/roleModel');
const { restApiResponse } = require('../utils/api-utils');

// Retrieve all users
exports.index = function (req, res) {
    Role.get((err, roles) => {
      restApiResponse(
        err,
        ['Error occured while fetching roles', 'All existing roles retrieved successfully'],
        roles,
        res,
      );
    });
  };