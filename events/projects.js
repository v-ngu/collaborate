const { v4: uuidv4 } = require("uuid");

const DatabaseHandler = require('../db/dbHandler');
const client = new DatabaseHandler();

const registerProjectsHandlers = (io, socket) => {
  // handlers
  const onAddTask = async ({ projectId, column, columnIndex, data }) => {
    const body = {
      taskId: uuidv4(),
      content: data
    }

    await client.addTask(projectId, column, body);
    io.to(socket.activeRoom).emit('projects:task-added', {
      columnIndex,
      addedTask: body
    });
  };

  const onAddUser = async ({ projectId, userId, index }) => {
    await client.addAuthorizedUser(projectId, userId);
    io.to(socket.activeRoom).emit('projects:user-added', { index });
  };

  const onRemoveUser = async ({ projectId, userId, index }) => {
    await client.removeAuthorizedUser(projectId, userId);
    io.to(socket.activeRoom).emit('projects:user-removed', { index });
  };

  // listeners and emitters
  socket.on('projects:add-task', onAddTask);
  socket.on('projects:add-user', onAddUser);
  socket.on('projects:remove-user', onRemoveUser);
};

module.exports = registerProjectsHandlers;