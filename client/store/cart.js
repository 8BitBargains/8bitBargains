import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_GAME = 'ADD_GAME';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });
const addGame = cart => ({ type: ADD_GAME, cart });
const updateQuantity = updatedCart => ({ type: UPDATE_QUANTITY, updatedCart });


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

  export const updateCart = (game) =>
    // update the quantity of a game in the cart on back end
    dispatch => (
      axios.put('/api/orders/cart', game)
        .then(res => {
          console.log('return from put: ', res.data);
          dispatch(updateQuantity(res.data));
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
    default:
      return state;
  }
}
