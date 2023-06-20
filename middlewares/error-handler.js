const { CustomApiError } = require('../errors')
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleWare = (err, _req, res, _next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(statusCode).json({ status: statusCode, error: errorMessage });
};

module.exports = errorHandlerMiddleWare;