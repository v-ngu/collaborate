const express = require('express');
const router = express.Router();

// import controllers
const { 
  createProject,
  getProject,
  getAllProjectsFromUser,
  getAuthorizedProjectsForUser,
 } = require('../controllers/projects');

// routes
router.route('/').post(createProject);
router.route('/user/:userId').get(getAllProjectsFromUser);
router.route('/shared/:userId').get(getAuthorizedProjectsForUser);
router.route('/:projectId').get(getProject);

module.exports = router;