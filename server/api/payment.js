// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys

const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const router = require('express').Router();

router.post('/', (req, res, next) => {
  console.log(req.body);
  const { amount, currency, source, description } = req.body;
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  stripe.charges.create({
    amount,
    currency,
    description,
    source,
  })
  .then( stripeRes => console.log(stripeRes) );

});

module.exports = router;

// const stripe = require('../constants/stripe');

// const postStripeCharge = res => (stripeErr, stripeRes) => {
//   if (stripeErr) {
//     res.status(500).send({ error: stripeErr });
//   } else {
//     res.status(200).send({ success: stripeRes });
//   }
// }

// const paymentApi = app => {
//   app.get('/', (req, res) => {
//     res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
//   });

//   app.post('/', (req, res) => {
//     stripe.charges.create(req.body, postStripeCharge(res));
//   });

//   return app;
// };