const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const FavouritesController = require('../controllers/favourites-controller');

router.post('/', checkAuth, FavouritesController.create);
router.delete('/:movieId', checkAuth, FavouritesController.delete);

module.exports = router;
