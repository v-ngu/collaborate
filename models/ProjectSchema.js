const isRequired = require('../utils/isRequired');

class ProjectSchema {
  constructor(userId = isRequired("userId")) {
    this.createdBy = userId;
    this.projectName = "";
    this.projectLists = [
      {
        column: "To Do",
        tasks: []
      },
      {
        column: "In Progress",
        tasks: []
      },
      {
        column: "Done",
        tasks: []
      },
    ];
    this.authorizedUsers = [];
  }
}

module.exports = ProjectSchema;