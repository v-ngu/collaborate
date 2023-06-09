const express = require('express');
const router = express.Router();

// import controllers
const { 
  createProject,
  getAllProjectsFromUser
 } = require('../controllers/projects');

// routes
router.route('/').post(createProject);
router.route('/:userId').get(getAllProjectsFromUser)

module.exports = router;