const Project = require("../models/ProjectSchema");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const client = require("../db/dbHandler");

/**
 * Controllers related to projects collection
 *
 */

// Create new project
const createProject = async (req, res) => {
  const { userId } = req.body;

  // Look if user exists
  if (!(Boolean(await client.findUser(userId)))) {
    throw new BadRequestError("Cannot create a project with non existing user");
  }

  // Create project
  const createdProject = await client.createProject(new Project(userId));
  const createdProjectId = createdProject.insertedId;
  console.log(`New project created with id: ${createdProjectId}`);

  // Response with created project ID
  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    data: { projectId: createdProjectId },
  });
};

// Get a specific project with ID
const getProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await client.findProject(projectId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED,
    data: project,
  });
};

// Get all projects created by a user
const getAllProjectsFromUser = async (req, res) => {
  const { userId } = req.params;

   // Look if user exists
   if (!(Boolean(await client.findUser(userId)))) {
     throw new BadRequestError("User does not exists");
   }

  // Get all projects and return
  const allProjects = await client.findAllProjectsFromUser(userId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED,
    data: allProjects,
  });
};

// Get all projects that a user has access authorization
const getAuthorizedProjectsForUser = async (req, res) => {
  const { userId } = req.params;
  const sharedProjects = await client.findAuthorizedProjectsForUser(userId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED,
    data: sharedProjects,
  });
};

// Update a project
const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { field, data } = req.body;
  await client.updateProject(projectId, field, data);
  
  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED,
    data: { msg: "Project updated" },
  });
};

// Delete a project
const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  await client.deleteProject(projectId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED,
    data: { msg: "Project deleted" },
  });
};

module.exports = {
  createProject,
  getProject,
  getAllProjectsFromUser,
  getAuthorizedProjectsForUser,
  updateProject,
  deleteProject,
};
