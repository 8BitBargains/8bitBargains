const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  status: {
    type: Sequelize.ENUM,
    values: ['open', 'closed']
  }

});

module.exports = Order;
