// basic configs
require('dotenv').config();
require('express-async-errors');

// server setup
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

// Socket.io setup to mount on express server
const { Server } = require('socket.io');
const io = new Server(server);

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
app.get('/api/user', (req, res) => {
  res.json('This is the private api');
});

// handling socket connection
io.on('connection', socket => {
  socket.on('join', () => {});
  socket.on('update', () => {});
});

// error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

// starting server and connecting to database
const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await client.connect()
    server.listen(port, () =>
      console.log(`Server is listening to port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();