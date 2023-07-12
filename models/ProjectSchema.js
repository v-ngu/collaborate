const { v4: uuidv4 } = require("uuid");
const isRequired = require('../utils/isRequired');

const pickColor = () => {
  const colors = ["#EB6868", "#526DC6", "#AD67CC", "#5A9B7E", "#F1BD6C"];
  const index = Math.floor(Math.random() *  colors.length);
  return colors[index];
};

class ProjectSchema {
  constructor(userId = isRequired("userId")) {
    this.createdBy = userId;
    this.projectName = "New Project";
    this.projectColor = pickColor();
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