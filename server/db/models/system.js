const Sequelize = require('sequelize');
const db = require('../db');

const System = db.define('system', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = System;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
