const { CustomApiError } = require('../errors')
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleWare = (err, _req, res, _next) => {
  // will have to put the internal error outside the if
  if (err instanceof CustomApiError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  };
};

module.exports = errorHandlerMiddleWare;