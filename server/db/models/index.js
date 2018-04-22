const User = require('./user');
const Game = require('./game');
const Genre = require('./genre');
const System = require('./system');
const Order = require('./order');
const GameOrder = require('./gameOrder');

//STOP. Association Time.

User.hasMany(Order);
Order.belongsTo(User);
Game.belongsTo(Genre);
Game.belongsTo(System);
Order.belongsToMany(Game, { through: GameOrder });
Game.belongsToMany(Order, { through: GameOrder });

//SEND IT!!!

module.exports = {
  User,
  Game,
  Genre,
  System,
  Order,
  GameOrder,
};
