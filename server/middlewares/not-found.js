/**
 * Middleware used for non-existing routes
 */
const { StatusCodes } = require('http-status-codes');

const notFoundMiddleware = (_req, res) => res.status(StatusCodes.NOT_FOUND).send('Route does not exist');

module.exports = notFoundMiddleware;