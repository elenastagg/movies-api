const cors = require('cors');
const express = require('express');
const db = require('./config/database');
const userRoute = require('./routes/users-routes');
const moviesRoute = require('./routes/movies-routes');

const app = express();

app.use(cors());

//Express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

app.use('/users', userRoute);
app.use('/movies', moviesRoute);

// app.post('/auth/login', (req, res) => {
//   res.json();
// });

// Test DB
db.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(`Error:' + ${err} `));
