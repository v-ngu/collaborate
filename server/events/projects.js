const TaskSchema = require('../models/TaskSchema');

const client = require('../db/dbHandler');

const registerProjectsHandlers = (io, socket) => {
  // handlers
  const onAddTask = async ({ projectId, column, columnIndex, data }) => {
    const body = new TaskSchema(data);

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

  const onTaskDragged = async ({ projectId, projectLists }) => {
    await client.updateProject(projectId, 'projectLists', projectLists);
    socket.to(socket.activeRoom).emit('projects:dnd-updated', { projectLists });
  };

  const onUpdate = async ({ projectId, field, formData }) => {
    await client.updateProject(projectId, field, formData);
    io.to(socket.activeRoom).emit('projects:updated', { field, formData });
  };

  // listeners and emitters
  socket.on('projects:add-task', onAddTask);
  socket.on('projects:add-user', onAddUser);
  socket.on('projects:remove-user', onRemoveUser);
  socket.on('projects:task-dragged', onTaskDragged);
  socket.on('projects:update', onUpdate);
};

module.exports = registerProjectsHandlers;