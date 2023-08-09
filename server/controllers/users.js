const User = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const client = require("../db/dbHandler");

/**
 * Controllers related to users collection
 *
 */

// Sign a user in
const login = async (req, res) => {
  const { id, email } = req.body;

  // Verify the existence of the user
  const user = await client.findUser(id);
  if (user)
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ status: StatusCodes.ACCEPTED, data: user });

  console.log(`No user with id ${id}`);

  // Else create a new user
  const createdUser = await client.createUser(new User(id, email));
  console.log(`New user created with id: ${createdUser.insertedId}`);

  // After the creation of the new user, return the response
  const newUser = await client.findUser(id);
  res
    .status(StatusCodes.CREATED)
    .json({ status: StatusCodes.ACCEPTED, data: newUser });
};

// Get all the team members
const getTeamMembersForProject = async (req, res) => {
  const { projectId } = req.params;
  const allMembers = await client.findTeamMembers(projectId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED,
    data: allMembers,
  });
};

module.exports = {
  login,
  getTeamMembersForProject,
};
