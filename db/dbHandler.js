require('dotenv').config({ path: '../.env' });
const { MongoClient } = require('mongodb');

// DatabaseHandler is used to handle MongoDB and its connection
class DatabaseHandler {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.db = this.client.db('collaborate');

    // collections
    this.users = this.db.collection('users');
    this.projects = this.db.collection('projects');
  }

  connect() {
    this.client.connect();
  };

  async findUser(id) {
    const result = await this.users.findOne({ _id: id });
    if (!result) console.log(`No user with id ${id}`)
    return result;
  };

  async createUser(newUser) {
    const result = await this.users.insertOne(newUser);
    console.log(`New user created with id: ${result.insertedId}`)
  }
}

module.exports = DatabaseHandler;