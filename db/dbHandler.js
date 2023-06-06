require('dotenv').config({ path: '../.env' });
const { MongoClient } = require('mongodb');
const { NotFoundError } = require('../errors');

// DatabaseHandler is used to handle MongoDB and its connection
class DatabaseHandler {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.db = this.client.db('collaborate');

    // databse collections
    this.users = this.db.collection('users');
    this.projects = this.db.collection('projects');
  }
  
  // connection method
  connect() {
    this.client.connect();
  };

  // users collections handlers
  async findUser(id) {
    return await this.users.findOne({ _id: id });
  };

  async createUser(newUser) {
    return await this.users.insertOne(newUser);
  }

  // projects collections handlers
  async findProject(id) {
    return await this.projects.findOne({ _id: id });
  }

  async createProject(newProject) {
    return await this.projects.insertOne(newProject);
  };
}

module.exports = DatabaseHandler;