const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const UsersController = require('../controllers/users-controller');
const FavouritesController = require('../controllers/favourites-controller');

router.post('/signup', UsersController.create);
router.post('/login', UsersController.login);
router.get(`/:id`, checkAuth, UsersController.getUser);
router.get('/:id/favourites', checkAuth, FavouritesController.list);

module.exports = router;
