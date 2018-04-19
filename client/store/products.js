import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const SORT_PRODUCTS = 'SORT_PRODUCTS';

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
export const sortProducts = (field, direction) => ({
  type: SORT_PRODUCTS, field, direction
});


/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch => (
    axios.get('/api/products')
      .then(res =>
        dispatch(getProducts(res.data)))
      .catch(err => console.log(err))
  );

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case SORT_PRODUCTS:
      if (action.field === 'price') {
        return numericSort([...state], action.field, action.direction);
      } else if (action.field === 'title') {
        return alphaSort([...state], action.field, action.direction);
      }
    default:
      return state;
  }
}

/**
 * SORTING FUNCTIONS
 */

const numericSort = (arr, field, direction) => {
  if (direction === 'asc') {
    return arr.sort((a, b) => a[field] - b[field]);
  } else if (direction === 'desc') {
    return arr.sort((a, b) => b[field] - a[field]);
  }
};

const alphaSort = (arr, field, direction) => {
  if (direction === 'asc') {
    return arr.sort((a, b) => a[field].localeCompare(b[field]));
  } else if (direction === 'desc') {
    return arr.sort((a, b) => b[field].localeCompare(a[field]));
  }
};
