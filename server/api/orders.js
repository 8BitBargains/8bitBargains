const router = require('express').Router();
const { Order, GameOrder } = require('../db/models');
module.exports = router;

router.get('/allOrders', (req, res, next) => {
  // returns all orders (should only be visible to super user)
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

router.get('/cart', (req, res, next) => {
  // gets the active cart or returns a new cart for the client
  const userId = req.user ? req.user.id : null;
  const sessionId = userId ? null : req.session.id;
  Order.findOrCreate({
    where: { userId, sessionId, status: 'Created' },
    include: { all: true }
  })
    .spread(cart => {
      res.json(cart);
    })
    .catch(next);
});

router.get('/:orderId?', (req, res, next) => {
  // fetches all orders for that specific user or fetches just one if
  // the optional orderId parameter is added
  const userId = req.user.id;
  if (req.params.orderId) {
    const id = req.params.orderId;
    Order.findOne({ where: { id, userId } });
  } else {
    Order.findAll({
      where: { userId }
    })
      .then(orders => res.json(orders))
      .catch(next);
  }
});

// Need to refactor to create a cart for visitors
// router.post('/', (req, res, next) => {
//   // create new order
//     const userId = req.body.userId;
//     const address = req.body.address;
//     Order.create({ userId, address })
//       .then(order => res.json(order))
//       .catch(next);
// });

router.post('/cart', (req, res, next) => {
  // create an instance of a game on an order
  const gameId = req.body.id;
  const userId = req.user ? req.user.id : null;
  const sessionId = userId ? null : req.session.id;
    Order.findOne({ where: { userId, sessionId, status: 'Created' } })
      .then(order => {
        const orderId = order.id;
        return GameOrder.create({ orderId, gameId });
      })
      .then(gameOrder => res.send(gameOrder))
      .catch(next);
});

router.put('/cart/:orderId', (req, res, next) => {
  // update the quantity of an instance in the gameOrders join table on an active order
  // if the new quantity === 0, remove the row on the game_order join table
  const orderId = req.params.orderId;
  const gameId = req.body.gameId;
  const quantity = req.body.newQuantity;
  if (quantity) {
    GameOrder.update({ quantity }, {
      where: { gameId, orderId },
      returning: true,
      plain: true
    })
      .then((updatedRow) => res.json(updatedRow[1][0]))
      .catch(next);
  } else {
    GameOrder.destroy({ where: { gameId, orderId } })
      .then(() => res.send({ gameId }))
      .catch(next);
  }
  // GameOrder.findOne({ where: { gameId, orderId } })
  //   .then(gameOrder => {
  //     return gameOrder.update({ quantity });
  //   })
  //   .then(gameOrder => {
  //     const id = gameOrder.orderId;
  //     return Order.findOne({ where: { id }, include: { all: true } });
  //   })
  //   .then(order => {
  //     res.send(order);
  //   })
  //   .catch(next);
});

// router.delete('/cart/:gameId/:orderId', (req, res, next) => {
//   // delete an item on an active order
//   const gameId = req.params.gameId;
//   const orderId = req.params.orderId;
//   GameOrder.destroy({ where: { gameId, orderId } })
//     .then(() => {
//       return Order.findOne({ where: { id: orderId }, include: { all: true } });
//     })
//     .then(order => res.json(order))
//     .catch(next);
// });
