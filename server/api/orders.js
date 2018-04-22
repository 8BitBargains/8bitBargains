const router = require('express').Router();
const { Order, ProductOrder, Product } = require('../db/models');
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
  // create an instance of a product on an order
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

