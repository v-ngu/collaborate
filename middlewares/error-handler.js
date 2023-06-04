const { CustomApiError } = require('../errors')
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleWare = (err, _req, res, _next) => {
  
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message })
  };

  const defaultErrorStatus = (err.status || StatusCodes.INTERNAL_SERVER_ERROR);
  return res.status(defaultErrorStatus).json({ err });
};

module.exports = errorHandlerMiddleWare;