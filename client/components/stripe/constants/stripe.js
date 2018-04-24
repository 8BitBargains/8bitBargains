const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_1dysNOap9T5HGtDRiSU8sZ9s';

export default STRIPE_PUBLISHABLE;
