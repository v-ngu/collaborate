const { v4: uuidv4 } = require("uuid");
const isRequired = require('../utils/isRequired');

class ProjectSchema {
  constructor(userId = isRequired("userId")) {
    this.createdBy = userId;
    this.projectName = "";
    this.projectLists = [
      {
        columnId: uuidv4(),
        column: "To Do",
        tasks: []
      },
      {
        columnId: uuidv4(),
        column: "In Progress",
        tasks: []
      },
      {
        columnId: uuidv4(),
        column: "Done",
        tasks: []
      },
    ];
    this.authorizedUsers = [];
  }
}

module.exports = ProjectSchema;