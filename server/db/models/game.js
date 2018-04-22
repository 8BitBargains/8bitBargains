const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  coverUrl: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Game;

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */
