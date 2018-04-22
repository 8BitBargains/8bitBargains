const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
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

module.exports = Product;

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */
