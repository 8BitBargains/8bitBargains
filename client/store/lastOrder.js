import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_LAST_ORDER = 'GET_LAST_ORDER';

/**
 * ACTION CREATORS
 */
const getLastOrder = lastOrder => ({ type: GET_LAST_ORDER, lastOrder });

/**
 * THUNK CREATORS
 */
export const fetchLastOrder = orderId => dispatch =>
  axios
    .get(`/api/orders/${orderId}`)
    .then(res => res.data)
    .then(order => {
      dispatch(getLastOrder(order));
    });

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_LAST_ORDER:
      return action.order;
    default:
      return state;
  }
}
