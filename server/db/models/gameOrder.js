const Sequelize = require('sequelize');
const db = require('../db');

const gameOrder = db.define('game_order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  salePrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
});

module.exports = gameOrder;
