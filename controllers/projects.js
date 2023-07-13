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

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED, data: createdProjectId
  });
};

const getProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await client.findProject(projectId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED, data: project
  });
};

const getAllProjectsFromUser = async (req, res) => {
  const { userId } = req.params;
  const allProjects = await client.findAllProjectsFromUser(userId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED, data: allProjects
  });
};

const getAuthorizedProjectsForUser = async (req, res) => {
  const { userId } = req.params;
  const sharedProjects = await client.findAuthorizedProjectsForUser(userId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED, data: sharedProjects
  });
};

const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { field, data } = req.body;
  await client.updateProject(projectId, field, data);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED, data: {
      msg: "Project updated"
    }
  });
};

module.exports = {
  createProject,
  getProject,
  getAllProjectsFromUser,
  getAuthorizedProjectsForUser,
  updateProject
};