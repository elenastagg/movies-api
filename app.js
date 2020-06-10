const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());

app.get('/search', (req, res) => {
  Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${req.query.query}`,
    ),
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`),
  ]).then(([moviesResponse, genresResponse]) => {
    const movies = moviesResponse.data.results.map(({ genre_ids, ...movie }) => ({
      ...movie,
      genres: genre_ids.map(
        (genreId) => genresResponse.data.genres.find((genre) => genre.id === genreId).name,
      ),
    }));

    res.json(movies);
  });
});

app.listen(process.env.PORT || 3000);
