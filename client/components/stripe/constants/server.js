const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://fsa-8bitbargains.herokuapp.com/api/payment'
  : 'http://localhost:8080/api/payment';

export default PAYMENT_SERVER_URL;
