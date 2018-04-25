import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER_ORDERS = 'GET_USER_ORDERS';
const CLEAR_ORDERS = 'CLEAR_ORDERS';

/**
 * ACTION CREATORS
 */
const getUserOrders = orders => ({ type: GET_USER_ORDERS, orders });
export const clearAllOrders = () => ({ type: CLEAR_ORDERS });

/**
 * THUNK CREATORS
 */
export const fetchUserOrders = (isAdmin=false) => {
  let routeEnding = isAdmin ? '/allOrders' : '';
  return dispatch => (
    axios.get('/api/orders/' + routeEnding)
      .then(res => res.data)
      .then(orders => {
        dispatch(getUserOrders(orders));
      })
  );
}


/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.orders;
    case CLEAR_ORDERS:
      return [];
    default:
      return state;
  }
}
