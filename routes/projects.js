const express = require('express');
const router = express.Router();

// import controllers
const { 
  createProject,
  getProject,
  getAllProjectsFromUser,
  getAuthorizedProjectsForUser,
  addAuthorizedUser
 } = require('../controllers/projects');

// routes
router.route('/').post(createProject);
router.route('/user/:userId').get(getAllProjectsFromUser);
router.route('/shared/:userId').get(getAuthorizedProjectsForUser);
router.route('/:projectId').get(getProject);
router.route('/:projectId/add-user/:userId').patch(addAuthorizedUser);

module.exports = router;