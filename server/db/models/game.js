const Sequelize = require('sequelize')
const db = require('../db')

// OB/KH: consider more validations, if needed, e.g unique, urlValidation
const Game = db.define('game', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // OB/KH: deal with prices as integers, good! floating point math woes otherwise
  price: {
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
})

module.exports = Game

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */
