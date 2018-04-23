const router = require('express').Router();
const { Order, ProductOrder, Product } = require('../db/models');
const { isLoggedIn, isAdmin } = require('../utils/gatekeeperMiddleware');
module.exports = router;

//TODO -- implement gatekeeping for this route
// GET all orders for all users (admin only)
router.get('/allOrders',
  isAdmin,
  (req, res, next) => {
    Order.findAll()
      .then(orders => res.json(orders))
      .catch(next);
  });

// GET all orders for current user
// GET one order for current user
router.get('/:orderId?', (req, res, next) => {
  // fetch ALL orders for CURRENT user or just ONE if optional orderId param
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

// GET cart ('created' order) for current user
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

// POST a single product to an order
router.post('/cart', (req, res, next) => {
  // ie add a product to the cart
  const productId = req.body.id;
  const userId = req.user ? req.user.id : null;
  const sessionId = userId ? null : req.session.id;
  console.log('inside the post to cart route');
  Order.findOne({ where: { userId, sessionId, status: 'Created' } })
    .then(order => {
      console.log('found order', order.id);
      const orderId = order.id;
      return ProductOrder.create({ orderId, productId });
    })
    .then(productOrder => {
      const id = productOrder.productId;
      return Product.findOne({ where: { id } })
    })
    .then(product => res.json(product))
    .catch(next);
});

// UPDATE quantity of a product on an order
router.put('/cart/:orderId', (req, res, next) => {
  // update the quantity of an instance in the productOrders join table on an active order
  // if the new quantity === 0, remove the row on the product_order join table
  const orderId = req.params.orderId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  if (quantity) {
    ProductOrder.update({ quantity }, {
      where: { productId, orderId },
      returning: true,
    })
      .then(([numAffected, affectedRows]) => {
        const id = affectedRows[0].productId;
        return Product.findOne({ where: { id } });
      })
      .then(product => res.json(product))
      .catch(next);
  } else {
    ProductOrder.destroy({ where: { productId, orderId } })
      .then(() => res.send({ productId: productId }))
      .catch(next);
  }
});

