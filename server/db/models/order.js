const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  address: {
    // expecting a comma separated string
    type: Sequelize.STRING,
  },

  status: {
    // defaults the status to 'Created' when an order is first created.
    type: Sequelize.ENUM,
    values: ['Created', 'Processing', 'Cancelled', 'Completed'],
    defaultValue: 'Created'
  }

});

module.exports = Order;
