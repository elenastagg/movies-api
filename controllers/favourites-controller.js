const Favourite = require('../models/favourite-model');
const User = require('../models/user-model');
const axios = require('axios');

// Create new favourite
module.exports.create = async (req, res) => {
  try {
    const [favourite, created] = await Favourite.findOrCreate({
      where: { movie_id: req.body.movie_id, user_id: req.userData.id },
      defaults: { movie_id: req.body.movie_id },
    });

    if (created) {
      const user = await User.findByPk(req.userData.id);
      await user.addFavourite(favourite);
    }

    return res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Find all favourites
module.exports.list = async (req, res) => {
  try {
    const favourites = await Favourite.findAll({
      where: {
        user_id: req.userData.id,
      },
    });

    const movies = await Promise.all(
      favourites.map(async (favourite) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${favourite.movie_id}?api_key=${process.env.API_KEY}`,
        );

        return response.data;
      }),
    );

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
