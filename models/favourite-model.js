const Sequelize = require('sequelize');
const User = require('./user-model');

const db = require('../config/database');

const Favourite = db.define(
  'favourite',
  {
    movie_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  },
);

// Favourite.belongsTo(User);

module.exports = Favourite;
