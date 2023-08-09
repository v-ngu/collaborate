// basic configs
require('dotenv').config();
require('express-async-errors');

/**
 * Setting up the server, socket and database
 */

// server setup
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const http = require('http');
const server = http.createServer(app);

// Socket.io setup to mount on express server
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    allowedHeaders: ["Authorization"],
  }
});

// mongoDB instance, handlers, and schemas
const client = require('./db/dbHandler');

/**
 * Imports
 */
// importing routes and controllers
const projectsRouter = require('./routes/projects');
const { login, getTeamMembersForProject } = require('./controllers/users');

// importing event listeners
const handleConnection = require('./events/handle-connection');

// importing middlewares
const morgan = require('morgan');
const cors = require('cors');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleWare = require('./middlewares/error-handler')
const { authMiddleware, socketAuthMiddleware } = require('./middlewares/auth');

/**
 * Middlewares
 */
app.use(morgan("tiny"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
// app.use(authMiddleware);

/**
 * Routes
 */
app.post('/api/users', login);
app.get('/api/team/project/:projectId', getTeamMembersForProject);
app.use('/api/projects', projectsRouter);

/**
 * Handling socket connection
 */
io.use(socketAuthMiddleware);
io.on('connection', (socket) => handleConnection(io, socket));

/**
 * Error handling middlewares
 */
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

/**
 * Starting server and connecting to database
 */
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