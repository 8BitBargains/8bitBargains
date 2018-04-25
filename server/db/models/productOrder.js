const Sequelize = require('sequelize');
const db = require('../db');

const productOrder = db.define('product_order', {
  quantity: {
    // number of products in cart which defaults to 1 when item is first added
    type: Sequelize.INTEGER,
    defaultValue: 1
  },

  salePrice: {
    // value of product at time of purchase where value is null prior
    // to completion of the order
    type: Sequelize.INTEGER,
    defaultValue: null
  }
});

module.exports = productOrder;
