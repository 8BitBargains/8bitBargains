const Sequelize = require('sequelize');
const db = require('../db');

const System = db.define('system', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = System;

// remove comments.

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */
