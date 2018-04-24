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
  .then( stripeRes => {
    console.log('stripe response ', stripeRes);
    // if (stripeRes) {
    //   res.sendStatus(200);
    //   res.redirect('/confirmation/');
    // } else {
    //   res.sendStatus(401);
    //   res.redirect('/');
    // }
    res.redirect(200, 'http://google.com');
  })
  .catch(next);

});

module.exports = router;
