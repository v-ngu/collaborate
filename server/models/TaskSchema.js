const { v4: uuidv4 } = require("uuid");

class TaskSchema {
  constructor(data) {
    this.taskId = uuidv4();
    this.task = data;
    this.assignee = "";
    this.dueDate = "";
    this.labels = [];
    this.description = "";
  }
}

module.exports = TaskSchema;