const User = require('../models/UserSchema');
const { StatusCodes } = require('http-status-codes');

const DatabaseHandler = require('../db/dbHandler');
const client = new DatabaseHandler();

// controllers realted to users collection
const login = async (req, res) => {
  const { id, email } = req.body;
  
  const user = await client.findUser(id);
  if (user) return res.status(StatusCodes.ACCEPTED).json(user);
  console.log(`No user with id ${id}`);
  
  const createdUser = await client.createUser(new User(id, email));
  console.log(`New user created with id: ${createdUser.insertedId}`);

  const newUser = await client.findUser(id);
  res.status(StatusCodes.CREATED).json(newUser);
}

const getTeamMembersForProject = async (req, res) => {
  const {projectId} = req.params;
  const allMembers = await client.findTeamMembers(projectId);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED, data: allMembers
  });
};

module.exports = { 
  login,
  getTeamMembersForProject
 };