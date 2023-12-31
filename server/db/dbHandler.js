require("dotenv").config({ path: "../.env" });
const { MongoClient, ObjectId } = require("mongodb");
const { NotFoundError } = require("../errors");
const { findTeamMembersPipeline } = require("./pipelines");

/**
 *  Database handler is used to handle MongoDB and its connection
 */

class DatabaseHandler {
  /**
   * Constructor
   */
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.db = this.client.db("collaborate");

    // databse collections
    this.users = this.db.collection("users");
    this.projects = this.db.collection("projects");
  }

  /**
   * Connection method
   */
  connect() {
    this.client.connect();
  }

  /**
   * Users collection handlers
   */
  async findTeamMembers(projectId) {
    //Return all users with added fields isOwner and isAuthorized.
    const pipeline = findTeamMembersPipeline(projectId);
    const aggCursor = await this.users.aggregate(pipeline);
    return await aggCursor.toArray();
  }

  async findUser(id) {
    return await this.users.findOne({ _id: id });
  }

  async createUser(newUser) {
    return await this.users.insertOne(newUser);
  }

  /**
   * Projects collection handlers
   */
  async createProject(newProject) {
    return await this.projects.insertOne(newProject);
  }

  async findProject(projectId) {
    const result = await this.projects.findOne(new ObjectId(projectId));
    if (!result) throw new NotFoundError(`No project with id ${projectId}`);
    return result;
  }

  async findAllProjectsFromUser(userID) {
    const cursor = await this.projects.find({ createdBy: userID });
    const results = await cursor.toArray();
    return results;
  }

  async findAuthorizedProjectsForUser(userId) {
    const cursor = await this.projects.find({ authorizedUsers: userId });
    const results = await cursor.toArray();
    return results;
  }

  async addTask(projectId, column, body) {
    const result = await this.projects.updateOne(
      { _id: new ObjectId(projectId), "projectLists.column": column },
      {
        $push: {
          "projectLists.$.tasks": {
            $each: [body],
            $position: 0,
          },
        },
      }
    );
    if (!result) throw new NotFoundError(`No project with id ${projectId}`);
    return result;
  }

  async updateProject(projectId, field, data) {
    const result = await this.projects.updateOne(
      { _id: new ObjectId(projectId) },
      { $set: { [field]: data } }
    );
    if (!result) throw new NotFoundError(`No project with id ${projectId}`);
    return;
  }

  async addAuthorizedUser(projectId, userId) {
    const result = await this.projects.updateOne(
      { _id: new ObjectId(projectId) },
      { $push: { authorizedUsers: userId } }
    );
    if (!result) throw new NotFoundError(`No project with id ${projectId}`);
    return;
  }

  async removeAuthorizedUser(projectId, userId) {
    const result = await this.projects.updateOne(
      { _id: new ObjectId(projectId) },
      { $pull: { authorizedUsers: userId } }
    );
  }

  async deleteProject(projectId) {
    const result = await this.projects.deleteOne({
      _id: new ObjectId(projectId),
    });
    if (!result) throw new NotFoundError(`No project with id ${projectId}`);
    return result;
  }
}

const client = new DatabaseHandler();

module.exports = client;
