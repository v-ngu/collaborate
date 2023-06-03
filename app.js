require('dotenv').config();
require('express-async-errors');

//const connectDB = require('./db/connect');
const morgan = require('morgan');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleWare = require('./middlewares/error-handler')
const checkJwt = require('./middlewares/checkJwt');

const express = require('express');
const app = express();

// middlewares
app.use(morgan("tiny"));
app.use(express.json());

// routes
app.get('/api/public', (req, res) => {
  res.json('This is the public api');
});

app.get('/api/private', checkJwt, (req, res) => {
  res.json('This is the private api');
});

// error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

// starting server
const port = process.env.PORT || 8000;
const start = async() => {
  try {
    // await will have to connect to DB
    app.listen(port, () => 
      console.log(`Server is listening to port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();