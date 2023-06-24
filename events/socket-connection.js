const onConnect = (socket) => {
  const roomId = socket.handshake.query.roomId;

  socket.join(roomId);
  console.log(`Joined socket room ${roomId}`);

  socket.emit('joined', roomId)
  socket.on('update', () => { });
};

module.exports = onConnect;
