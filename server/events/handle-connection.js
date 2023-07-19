const registerProjectsHandlers = require('./projects');

const handleConnection = (io, socket) => {
  // active room ID
  const roomId = socket.handshake.query.roomId;
  socket.activeRoom = roomId;

  // joining the room ID
  socket.join(roomId);
  socket.emit('joined', roomId);

  // register listeners
  registerProjectsHandlers(io, socket);
};

module.exports = handleConnection;
