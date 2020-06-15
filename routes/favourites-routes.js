const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const FavouritesController = require('../controllers/favourites-controller');

router.post('/', checkAuth, FavouritesController.create);

module.exports = router;
