import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';
import { submitOrder } from '../../store';
import { connect } from 'react-redux';
import { shippingOptions } from '../../utils';

const CURRENCY = 'USD';

const fromUSDToCent = amount => amount * 100;

const errorPayment = () => {
  alert('Payment Error');
};

const Checkout = ({ name, description, amount, orderId, onToken, address }) => (
  // dispatching payment information to stripe
  <StripeCheckout
    name={name}
    description={description}
    amount={Math.floor(fromUSDToCent(amount))}
    token={onToken(Math.floor(fromUSDToCent(amount)), description, address)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    orderId = {orderId}
    address = {address}
  />
);

const mapDispatch = ((dispatch, ownProps) => {
  // dispatch request to backend with the order information
  return {
    onToken: (amount, description, address) => token => {
      axios.post(PAYMENT_SERVER_URL,
        {
          description,
          source: token.id,
          currency: CURRENCY,
          amount,
          address
        })
        .then(() => {
          // submit order sends request to retrieve the purchased order
          // and load the confirmation page
          dispatch(submitOrder(address, ownProps.history));
        })
        .catch(errorPayment);
      }
  };
});

const CheckoutContainer = connect(null, mapDispatch)(Checkout);

export default CheckoutContainer;
