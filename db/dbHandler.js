require('dotenv').config({path: '../.env'});
const { MongoClient } = require('mongodb');

// DatabaseHandler is used to handle MongoDB and its connection
class DatabaseHandler {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.db = this.client.db('collaborate');
    this.collections = {
      users: this.db.collection('users'),
      projects: this.db.collection('projects')
    }
  }

  connect() {
    this.client.connect();
  }
}

module.exports = DatabaseHandler;