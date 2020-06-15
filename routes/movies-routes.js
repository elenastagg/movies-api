const express = require('express');
const moviesController = require('../controllers/movies-controller');

const router = express.Router();

router.get('/search', moviesController.search);

module.exports = router;
