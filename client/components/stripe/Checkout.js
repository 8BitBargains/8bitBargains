import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';
import { submitOrder } from '../../store';
import { connect } from 'react-redux';

const CURRENCY = 'USD';

const fromUSDToCent = amount => amount * 100;

// const successPayment = data => {
//   console.log('this is the payment data ',data)
//   alert('Payment Successful');


// };

const errorPayment = data => {
  alert('Payment Error');
};

// const onToken = (amount, description) => token =>
//   axios.post(PAYMENT_SERVER_URL,
//     {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromUSDToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);

const Checkout = ({ name, description, amount, orderId, onToken }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    orderId = {orderId}
  />
);

const mapDispatch = ((dispatch, ownProps) => {
  //need to move ontoken function here so it has access to dispatch
  // so that we can dispatch the submit checkout thunk 
  // which will update database and redirect to confirmation page.
  return {
    onToken: (amount, description) => token => {
    console.log('mapdispatch ownprops', ownProps);

      axios.post(PAYMENT_SERVER_URL,
        {
          description,
          source: token.id,
          currency: CURRENCY,
          amount: fromUSDToCent(amount)
        })
        .then((data) => {
          console.log('this is the payment data ', data);
          alert('Payment Successful');
          dispatch(submitOrder('test', ownProps.history));
        })
        .catch(errorPayment)
      }
  };
});

const CheckoutContainer = connect(null, mapDispatch)(Checkout);

export default CheckoutContainer;
