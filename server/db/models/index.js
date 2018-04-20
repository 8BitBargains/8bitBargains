const User = require('./user');
const Game = require('./game');
const Order = require('./order');
const GameOrder = require('./gameOrder');

//STOP. Association Time.

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Game, { through: GameOrder });
Game.belongsToMany(Order, { through: GameOrder });

//SEND IT!!!

module.exports = {
  User,
  Game,
  Order,
  GameOrder,
};
