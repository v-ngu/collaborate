const Project = require('../models/ProjectSchema');
const { StatusCodes } = require('http-status-codes');

const DatabaseHandler = require('../db/dbHandler');
const client = new DatabaseHandler();

// controllers related to projects collection
const createProject = async (req, res) => {
  const { userId } = req.body;

  const createdProject = await client.createProject(new Project(userId));

  const createdProjectId = createdProject.insertedId
  console.log(`New project created with id: ${createdProjectId}`);

  res.status(StatusCodes.CREATED).json(createdProjectId);
};

module.exports = {
  createProject
}