import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

/**
 * ACTION CREATORS
 */
const getSingleProduct = product => ({ type: GET_SINGLE_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (id) => {
  return dispatch => (
    axios.get(`/api/products/${id}`)
      .then(res => {
        dispatch(getSingleProduct(res.data));
      }
      )
      .catch(err => console.log(err))
  );
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
