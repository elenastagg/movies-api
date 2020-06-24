const axios = require('axios');
const Favourite = require('../models/favourite-model');

module.exports.search = (req, res) => {
  Promise.all([
    // Search for movie data
    Favourite.findAll({
      where: {
        user_id: req.userData.id,
      },
    }),
    axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${req.query.query}`,
    ),
    // Get genre data
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`),
  ]).then(([favourites, moviesResponse, genresResponse]) => {
    const movies = moviesResponse.data.results.map(({ genre_ids, ...movie }) => ({
      ...movie,
      genres: genre_ids.map(
        (genreId) => genresResponse.data.genres.find((genre) => genre.id === genreId).name,
      ),
      isAdded: favourites.some((fav) => fav.movie_id === movie.id),
    }));
    res.json(movies);
  });
};
