const isRequired = require('../utils/isRequired');

class ProjectSchema {
  constructor(userId = isRequired("userId")) {
    this.createdBy = userId;
    this.toDo = [];
    this.inProgress=[];
    this.done = [];
    this.authorizedUsers = [];
  }
}

module.exports = ProjectSchema;