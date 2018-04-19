const router = require('express').Router();
const { Order, GameOrder } = require('../db/models');
module.exports = router;

router.get('/allOrders', (req, res, next) => {
  // returns all orders (should only be visible to super user)
  Order.findAll()
    .then(orders  => res.json(orders))
    .catch(next);
});

router.get('/cart', (req, res, next) => {
  const userId = req.user.id;
  Order.findOne({where: { userId, status: 'Created' }, include: {all: true}})
    .then(cart => res.json(cart))
    .catch(next);
});

router.get('/:orderId?', (req, res, next) => {
  // fetches all orders for that specific user or fetches just one if
  // the optional orderId parameter is added
  const userId = req.user.id;
  if (req.params.orderId){
    const id = req.params.orderId;
    Order.findOne({where: { id, userId }})
  } else {
    Order.findAll({
      where: { userId }
    })
      .then(orders  => res.json(orders))
      .catch(next);
  }
});

router.post('/', (req, res, next) => {
  // create new order
    const userId = req.body.userId;
    const address = req.body.address;
    Order.create({ userId, address })
      .then(order => res.json(order))
      .catch(next);
});

router.post('/:orderId/games', (req, res, next) => {
    // create an instance of a game on an order
  const orderId = req.params.orderId;
  const gameId = req.body.gameId;
  GameOrder.create({orderId, gameId})
    .then(gameOrder => res.send(gameOrder))
    .catch(next);
});

router.put('/:orderId/games', (req, res, next) => {
  // update an instance in the gameOrders join table on an active order
  const orderId = req.params.orderId;
  const gameId = req.body.gameId;
  const quantity = req.body.quantity;
  GameOrder.findOne({where: { gameId, orderId }})
    .then(gameOrder => {
      return gameOrder.update({ quantity })
    })
    .then(gameOrder => res.send(gameOrder))
    .catch(next);
});

router.delete('/:orderId', (req, res, next) => {
  // delete an item on an active order
  const orderId = req.params.orderId;
  const gameId = req.body.gameId;
  GameOrder.findOne({where: { gameId, orderId }})
    .then(gameOrder => gameOrder.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
