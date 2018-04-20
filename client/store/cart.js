import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_GAME = 'ADD_GAME';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });
const addGame = cart => ({ type: ADD_GAME, cart });

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
        console.log('history: ', history);
        dispatch(addGame(res.data));
        history.push('/cart');
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
    default:
      return state;
  }
}
