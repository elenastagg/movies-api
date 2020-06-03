const express = require('express');

const router = express.Router();

const UsersController = require('../controllers/users-controller');

// Get users list
router.get('/', UsersController.list);

// Add a user
router.post('/signup', UsersController.create);

module.exports = router;
