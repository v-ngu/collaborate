const DatabaseHandler = require('../db/dbHandler');
const client = new DatabaseHandler();

const registerProjectsHandlers = (io, socket) => {
  // handlers
  const onAddTask = async ({ projectId, column, columnIndex, body }) => {
    await client.addTask(projectId, column, body);
    io.to(socket.activeRoom).emit('projects:task-added', {
      columnIndex, 
      addedTask: body
    });
  };

  // listeners and emitters
  socket.on('projects:add-task', onAddTask);

};

module.exports = registerProjectsHandlers;