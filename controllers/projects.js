const Project = require('../models/ProjectSchema');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const DatabaseHandler = require('../db/dbHandler');
const client = new DatabaseHandler();

// controllers related to projects collection
const createProject = async (req, res) => {
  const { userId } = req.body;

  const createdProject = await client.createProject(new Project(userId));

  const createdProjectId = createdProject.insertedId
  console.log(`New project created with id: ${createdProjectId}`);

  const project = await client.findProject(createdProjectId);
  if (!project) throw new NotFoundError(`No project with id ${createdProjectId}`);

  res.status(StatusCodes.CREATED).json(project);
};

module.exports = {
  createProject
}