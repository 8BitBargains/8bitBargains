import axios from 'axios';
import { numSort, alphaSort } from '../utils';

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
  type: SORT_PRODUCTS,
  field,
  direction
});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => dispatch =>
  axios
    .get('/api/products')
    .then(res => dispatch(getProducts(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case SORT_PRODUCTS:
      if (action.field === 'price') {
        return numSort([...state], action.field, action.direction);
      } else if (action.field === 'title') {
        return alphaSort([...state], action.field, action.direction);
      }
      break;
    default:
      return state;
  }
}
