const bcrypt = require('bcrypt');
const User = require('../models/user-model');

module.exports.list = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => console.log(err));
};

module.exports.create = (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: hash,
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err.message }));
};
