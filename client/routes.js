import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  BrowseProducts,
  SingleProduct,
  Cart,
  OrderInfo,
  OrderHistory,
} from './components';
import { me, addToCart, updateCart } from './store';
import { fetchCart } from './store/cart';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" render={
          () => <BrowseProducts handleAddButton={this.props.handleAddButton} />
        } />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/cart/process" component={OrderInfo} />

        <Route path="/products/:productId" render={
          ({ match }) => <SingleProduct match={match} handleAddButton={this.props.handleAddButton} />
        } />
        {
          isLoggedIn &&
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route patch="/order-history" component={OrderHistory} />
          </Switch>
        }
        {/* Displays our Browse component as a fallback */}
        <Route render={
          () => <BrowseProducts handleAddButton={this.props.handleAddButton} />
        } />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  // loads user and fetches cart upon load
  return {
    loadInitialData: () => {
      dispatch(me());
      dispatch(fetchCart());
    },
    handleAddButton: (cart, product) => {
      // check if product is in cart
      const productInCart = cart.cartProducts.filter(
        cartProduct => cartProduct.product.id === product.id
      )[0];
      if (productInCart) {
        dispatch(updateCart(cart.id, product.id, ++productInCart.quantity, ownProps.history));
      }
      else dispatch(addToCart(product, ownProps.history));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
