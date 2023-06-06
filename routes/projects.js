const express = require('express');
const router = express.Router();

// import controllers
const { createProject } = require('../controllers/projects');

// routes
router.route('/').post(createProject);

module.exports = router;