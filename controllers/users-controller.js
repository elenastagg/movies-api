const bcrypt = require('bcrypt');
const User = require('../models/user-model');

module.exports.list = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports.create = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    const [user, created] = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
      },
    });
    if (created) {
      res.status(201).json(user);
    } else {
      res.status(422).json({ message: 'email already exists' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
