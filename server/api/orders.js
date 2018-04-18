const router = require('express').Router();
const { Order, GameOrder } = require('../db/models');
module.exports = router;

router.get('/:userId/allOrders', (req, res, next) => {
  // ONLY ADMIN SHOULD BE ABLE TO SEE THIS ROUTE
  // to reiterate, ONLY ADMIN SHOULD BE ABLE TO SEE THIS ROUTE
  // userId/privileges will have to be pulled in from
  // the session data
  // might need to add a 'privileges' ENUM column to User db
  // and use that to protect our findAll
  Order.findAll()
  .then(orders  => res.json(orders))
  .catch(next);
});

router.get('/:userId/:orderId?', (req, res, next) => {
  // fetches all orders based on userId or fetches just one if
  // the optional orderId parameter is added
  // ONLY ADMIN AND THE SPECIFIC USER SHOULD BE ABLE TO
  // SEE THIS ROUTE
  // to reiterate, ONLY ADMIN AND THE SPECIFIC USER
  //SHOULD BE ABLE TO SEE THIS ROUTE
  const userId = req.params.userId;
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

router.post('/:userId', (req, res, next) => {
  // create new order
  const userId = req.params.userId
  const address = req.body.address.split(',');
  Order.create({ userId, address })
  .then(order => res.json(order))
  .catch(next);
});

router.put('/:userId/:orderId/:gameId', (req, res, next) => {
  // update an item on an active order
  const gameId = req.params.gameId;
  const orderId = req.params.orderId;
  const quantity = req.body.quantity;
  GameOrder.findOne({where: { gameId, orderId }})
  .then(gameOrder => {
    return gameOrder.update({ quantity });
  })
  .then(gameOrder => res.send(gameOrder))
  .catch(next);
});

router.delete('/:userId/:orderId/:gameId', (req, res, next) => {
  // delete an item on an active order
  const gameId = req.params.gameId;
  const orderId = req.params.orderId;
  GameOrder.findOne({where: { gameId, orderId }})
  .then(gameOrder => gameOrder.destroy())
  .then(() => res.sendStatus(204))
  .catch(next);
});

