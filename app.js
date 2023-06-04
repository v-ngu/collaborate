// basic configs
require('dotenv').config();
require('express-async-errors');

// express setup
const express = require('express');
const app = express();

// mongoDB instance and handlers
const DatabaseHandler = require('./db/dbHandler');
const client = new DatabaseHandler();

// import middlewares
const morgan = require('morgan');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleWare = require('./middlewares/error-handler')
const authMiddleware = require('./middlewares/auth');

// use middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(authMiddleware);

// routes
app.get('/api/private', (req, res) => {
  res.json('This is the private api');
});

// error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

// starting server and connecting to database
const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await client.connect()
    app.listen(port, () =>
      console.log(`Server is listening to port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();