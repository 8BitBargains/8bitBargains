const User = require('./user');
const Product = require('./product');
const Genre = require('./genre');
const System = require('./system');
const Order = require('./order');
const ProductOrder = require('./productOrder');

//STOP. Association Time.

User.hasMany(Order);
Order.belongsTo(User);
Product.belongsTo(Genre);
Product.belongsTo(System);
Order.belongsToMany(Product, { through: ProductOrder });
Product.belongsToMany(Order, { through: ProductOrder });

//SEND IT!!!

module.exports = {
  User,
  Product,
  Genre,
  System,
  Order,
  ProductOrder,
};
