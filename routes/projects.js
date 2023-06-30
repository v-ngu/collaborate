const express = require('express');
const router = express.Router();

// import controllers
const { 
  createProject,
  getProject,
  getAllProjectsFromUser
 } = require('../controllers/projects');

// routes
router.route('/').post(createProject);
router.route('/user/:userId').get(getAllProjectsFromUser)
router.route('/:projectId').get(getProject)

module.exports = router;