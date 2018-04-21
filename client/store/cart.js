import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_GAME = 'ADD_GAME';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const REMOVE_GAME = 'REMOVE_GAME';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });
const addGame = cart => ({ type: ADD_GAME, cart });
const updateQuantity = updatedCart => ({ type: UPDATE_QUANTITY, updatedCart });
const removeGame = updatedCart => ({ type: REMOVE_GAME, updatedCart });

/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  // retrieve the cart from the back end
  dispatch => (
    axios.get('/api/orders/cart')
      .then(res =>
        dispatch(getCart(res.data)))
      .catch(err => console.log(err))
  );

  export const addToCart = (product, history) =>
  // add games to cart on back end
  dispatch => (
    axios.post(`/api/orders/cart`, product)
    .then(res => {
      dispatch(addGame(res.data));
      history.push('/cart');
    })
    .catch(err => console.log(err))
  );

  export const updateCart = (game, newQuantity) =>
  // update the quantity of a game in the cart on back end
  dispatch => (
    axios.put('/api/orders/cart', {...game, newQuantity: newQuantity})
      .then(res => {
        dispatch(updateQuantity(res.data));
      })
      .catch(err => console.log(err))
  );

  export const removeFromCart = (game) =>
    // remove a game from the cart
    dispatch => (
      axios.delete('/api/orders/cart/' + game.id + '/' + game.game_order.orderId)
      .then(res => {
        console.log(res.data);
        dispatch(removeGame(res.data));
      })
      .catch(err => console.log(err))
    );

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_GAME:
      return action.cart;
    case UPDATE_QUANTITY:
      return action.updatedCart;
    case REMOVE_GAME:
      return action.updatedCart;
    default:
      return state;
  }
}
