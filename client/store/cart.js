import axios from 'axios';
const _ = require('lodash');

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';

const ADD_CART_PRODUCT = 'ADD_CART_PRODUCT';
const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';
const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT';

const UPDATE_CART_ADDRESS = 'UPDATE_CART_ADDRESS';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });

const addCartProduct = cartProduct => ({ type: ADD_CART_PRODUCT, cartProduct });
const updateProductQuantity = cartProduct => ({ type: UPDATE_PRODUCT_QUANTITY, cartProduct });
const removeCartProduct = removedProductId => ({ type: REMOVE_CART_PRODUCT, removedProductId });

const updateCartAddress = address => ({ type: UPDATE_CART_ADDRESS, address });

/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  // retrieve the cart from the back end
  dispatch => (
    axios.get('/api/orders/cart')
      .then(res => {
        const cart = {
          id: res.data.id,
          address: res.data.address,
          cartProducts: res.data.games.map(game => {
            return {
              game: _.omit(game, 'game_order'),
              quantity: game.game_order.quantity
            };
          })
        };
        dispatch(getCart(cart))
      })
      .catch(err => console.log(err))
  );

export const addToCart = (product, history) =>
  // add games to cart on back end
  dispatch => (
    axios.post(`/api/orders/cart`, product)
      .then(res => {
        const cartProduct = {
          game: res.data,
          quantity: 1
        };
        dispatch(addCartProduct(cartProduct));
        history.push('/cart');
      })
      .catch(err => console.log(err))
  );

export const updateCart = (orderId, productId, quantity, history) =>
  // update the quantity of a game in the cart
  dispatch => {
    return (
      axios.put(`/api/orders/cart/${orderId}`, { productId, quantity })
        .then(res => {
          const cartProduct = {
            game: res.data,
            quantity
          };
          dispatch(updateProductQuantity(cartProduct));
          if (history) history.push('/cart');
        })
        .catch(err => console.log(err))
    );
  };

export const removeFromCart = (orderId, productId) =>
  // remove a game from the cart
  dispatch => (
    axios.put(`/api/orders/cart/${orderId}`, { productId, quantity: 0 })
      .then(res => {
        const removedProductId = res.data.productId;
        dispatch(removeCartProduct(removedProductId));
      })
      .catch(err => console.log(err))
  );

export const updateAddress = address =>
  // update the address of the cart
  dispatch => (
    axios.put('/api/orders/cart/address', address)
      .then(res => {
        dispatch(updateCartAddress(res.data));
      })
      .catch(err => console.log(err))
  );


/**
 * REDUCER
 */
export default function (state = { id: null, cartProducts: [], address: '' }, action) {
  switch (action.type) {

    case GET_CART:
      return action.cart;

    case ADD_CART_PRODUCT:
      return Object.assign({}, state, {
        cartProducts: [...state.cartProducts, action.cartProduct]
      });

    case UPDATE_PRODUCT_QUANTITY:
      return Object.assign({}, state, {
        cartProducts: [
          ...state.cartProducts.filter(cartProduct => {
            return cartProduct.game.id !== action.cartProduct.game.id;
          }),
          action.cartProduct
        ]
      });

    case REMOVE_CART_PRODUCT:
      return Object.assign({}, state, {
        cartProducts: [
          ...state.cartProducts.filter(cartProduct => {
            return cartProduct.game.id !== action.removedProductId;
          })
        ]
      });

    case UPDATE_CART_ADDRESS:
      return Object.assign({}, state, { address: action.address });

    default:
      return state;
  }
}
