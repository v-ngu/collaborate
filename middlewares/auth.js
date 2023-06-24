require('dotenv').config();
const { UnauthenticatedError } = require('../errors');

// module used for HTTP requests auth
const { auth } = require('express-oauth2-jwt-bearer');

// modules used for socket
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// authentification middlewares
const authMiddleware = auth({
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
});

const socketAuthMiddleware = async (socket, next) => {
  const authHeader = socket.handshake.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const client = jwksClient({
      jwksUri: 'https://dev-f0hu8rjww3b0tiuf.us.auth0.com/.well-known/jwks.json',
    });

    const kid = process.env.KID;
    const key = await client.getSigningKey(kid);
    const signingKey = await key.getPublicKey();

    const jwtCallback = (error, decoded) => {
      if (error) {
        console.log(error)
        return next(new UnauthenticatedError('Authentication invalid for socket'))
      };
      socket.decoded = decoded;
      next();
    }

    await jwt.verify(
      token,
      signingKey,
      { algorithms: ['RS256'] },
      jwtCallback
    );
  }
  else {
    next(new UnauthenticatedError('Missing Access Token'));
  }
};

module.exports = {
  authMiddleware,
  socketAuthMiddleware
};