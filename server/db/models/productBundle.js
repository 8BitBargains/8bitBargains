const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');

const productBundle = db.define('product_bundle', {});

module.exports = productBundle;
