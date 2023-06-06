const User = require('../models/UserSchema');
const { StatusCodes } = require('http-status-codes')

const DatabaseHandler = require('../db/dbHandler');
const client = new DatabaseHandler();

// controllers
const login = async (req, res) => {
  const { id, email } = req.body;
  
  const user = await client.findUser(id);
  if (user) return res.status(StatusCodes.ACCEPTED).json(user);

  await client.createUser(new User(id, email));
  const newUser = await client.findUser(id);

  res.status(StatusCodes.CREATED).json(newUser);
}

module.exports = { login };