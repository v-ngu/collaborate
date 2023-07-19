require('dotenv').config();
const { UnauthenticatedError } = require('../errors');

// authentification for HTTP requests
const { auth } = require('express-oauth2-jwt-bearer');

const authMiddleware = auth({
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
});

// authentification for socket.io
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const socketAuthMiddleware = async (socket, next) => {
  const authHeader = socket.handshake.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const client = jwksClient({
      jwksUri: 'https://dev-f0hu8rjww3b0tiuf.us.auth0.com/.well-known/jwks.json',
    });

    const key = await client.getSigningKey(process.env.KID);
    const signingKey = await key.getPublicKey();

    const jwtCallback = (error, decoded) => {
      if (error) {
        console.log(error)
        return next(new UnauthenticatedError('Authentication invalid for socket'))
      };
      next();
    }

    await jwt.verify(token, signingKey, { algorithms: ['RS256'] }, jwtCallback);

  }
  else {
    next(new UnauthenticatedError('Missing Access Token'));
  }
};

module.exports = {
  authMiddleware,
  socketAuthMiddleware
};