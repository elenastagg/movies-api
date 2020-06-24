const express = require('express');
const moviesController = require('../controllers/movies-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/search', checkAuth, moviesController.search);

module.exports = router;
