module.exports = {
  restApiResponse(err, message, data = '', res = null, debug = false) {
    if (err) {
      if (debug) {
        res.json({
          status: 'error',
          message: message[0],
          debug: err,
        });
      } else {
        res.json({
          status: 'error',
          message: message[0],
        });
      }
    } else if (data === 0) {
      res.json({
        status: 'error',
        message: "There's no data to retrieve",
      });
    } else {
      res.json({
        status: 'success',
        message: message[1],
        data,
      });
    }
  },
};
