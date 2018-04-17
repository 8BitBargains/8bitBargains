const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router

router.get('/', (req, res, next) => {
  //ONLY ADMIN SHOULD BE ABLE TO SEE THIS ROUTE
  //to reiterate, ONLY ADMIN SHOULD BE ABLE TO SEE THIS ROUTE
  Order.findall()
  .then(orders  => res.json(orders))
  .catch(next);
})

// router.get('/:userId/:orderId?', (req, res, next) => {
//   //ONLY ADMIN AND THE SPECIFIC USER SHOULD BE ABLE TO SEE THIS ROUTE
//   //to reiterate, ONLY ADMIN AND THE SPECIFIC USER
//   //SHOULD BE ABLE TO SEE THIS ROUTE

//   Order.findall({
//     where: {}
//   })
//   .then(orders  => res.json(orders))
//   .catch(next);
// })

