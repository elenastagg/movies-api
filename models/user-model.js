const Sequelize = require('sequelize');
const Favourite = require('./favourite-model');
const db = require('../config/database');

const User = db.define(
  'user',
  {
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  },
);

User.hasMany(Favourite);

module.exports = User;
