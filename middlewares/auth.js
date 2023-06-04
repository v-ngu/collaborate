require('dotenv').config();
const { auth } = require('express-oauth2-jwt-bearer');

const authMiddleware = auth({
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
});

module.exports = authMiddleware;