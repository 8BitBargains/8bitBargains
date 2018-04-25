const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const router = require('express').Router();

router.post('/', (req, res, next) => {
  const { amount, currency, source, description } = req.body;
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  stripe.charges.create({
    amount,
    currency,
    description,
    source,
  })
  .then( () => {
    res.sendStatus(200);
  })
  .catch(next);
});

module.exports = router;
