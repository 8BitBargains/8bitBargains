import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER_ORDERS = 'GET_USER_ORDERS';


/**
 * ACTION CREATORS
 */
const getUserOrders = orders => ({type: GET_USER_ORDERS, orders});


/**
 * THUNK CREATORS
 */
export const fetchUserOrders = userId =>
  dispatch => (
    axios.get('/api/orders/user/' + userId)
      .then(orders => {
        dispatch(getUserOrders(orders));
      })
);

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type){
    case GET_USER_ORDERS:
      return {...state, orders: action.orders};
    default:
      return state;
  }
}
