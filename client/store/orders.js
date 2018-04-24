import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER_ORDERS = 'GET_USER_ORDERS';

/**
 * ACTION CREATORS
 */
const getUserOrders = orders => ({ type: GET_USER_ORDERS, orders });

/**
 * THUNK CREATORS
 */
export const fetchUserOrders = () => dispatch =>
  axios
    .get('/api/orders/')
    .then(res => res.data)
    .then(orders => {
      dispatch(getUserOrders(orders));
    });

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
