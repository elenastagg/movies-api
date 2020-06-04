const express = require('express');

const router = express.Router();

const UsersController = require('../controllers/users-controller');

router.get('/', UsersController.list);
router.post('/signup', UsersController.create);
router.post('/login', UsersController.find);

module.exports = router;
