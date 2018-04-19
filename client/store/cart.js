import axios from 'axios';
import history from '../history';

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
  dispatch => (
    axios.get('/api/orders/cart')
      .then(res =>
        dispatch(getCart(res.data)))
      .catch(err => console.log(err))
  );

// export const addToCart = () =>
//   dispatch => (
//     axios.post('/api/{store.cart.id}/games')
//       .then(res =>
//         dispatch(addGame(res.data)))
//       .catch(err => console.log(err))
//   );

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
