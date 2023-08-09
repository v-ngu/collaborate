/**
 * Aggregation pipeline to get all team members.
 * Return all users with added fields isOwner and isAuthorized.
 */

const { ObjectId } = require('mongodb');

const findTeamMembersPipeline = (projectId) => {
  return ([
    {
      '$lookup': {
        'from': 'projects',
        'localField': '_id',
        'foreignField': 'createdBy',
        'as': 'ownProjects'
      }
    }, {
      '$lookup': {
        'from': 'projects',
        'localField': '_id',
        'foreignField': 'authorizedUsers',
        'as': 'otherProjects'
      }
    }, {
      '$addFields': {
        'ownProjectIds': '$ownProjects._id',
        'otherProjectIds': '$otherProjects._id'
      }
    }, {
      '$project': {
        '_id': 1,
        'firstName': 1,
        'lastName': 1,
        'email': 1,
        'isOwner': {
          '$in': [
            new ObjectId(projectId), '$ownProjectIds'
          ]
        },
        'isAuthorized': {
          '$in': [
            new ObjectId(projectId), '$otherProjectIds'
          ]
        }
      }
    }, {
      '$sort': {
        'firstName': 1,
        'lastName': 1
      }
    }
  ])
};

module.exports = {
  findTeamMembersPipeline
}