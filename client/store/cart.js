import axios from 'axios';
import { omit } from 'lodash';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_CART_PRODUCT = 'ADD_CART_PRODUCT';
const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';
const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });

const addCartProduct = cartProduct => ({ type: ADD_CART_PRODUCT, cartProduct });
const updateProductQuantity = cartProduct => ({
  type: UPDATE_PRODUCT_QUANTITY,
  cartProduct
});
const removeCartProduct = removedProductId => ({
  type: REMOVE_CART_PRODUCT,
  removedProductId
});

/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  // retrieve the cart from the back end
  dispatch =>
    axios
      .get('/api/orders/cart')
      .then(res => {
        const cart = {
          id: res.data.id,
          address: res.data.address,
          // check if products arr exists, it won't on the first load
          cartProducts: res.data.products
            ? res.data.products.map(product => {
                return {
                  product: omit(product, 'product_order'),
                  quantity: product.product_order.quantity
                };
              })
            : []
        };
        dispatch(getCart(cart));
      })
      .catch(err => console.log(err));

export const addToCart = (product, history) =>
  // add products to cart on back end
  dispatch =>
    axios
      .post(`/api/orders/cart`, product)
      .then(res => {
        const cartProduct = {
          product: res.data,
          quantity: 1
        };
        dispatch(addCartProduct(cartProduct));
        history.push('/cart');
      })
      .catch(err => console.log(err));

export const updateCart = (orderId, productId, quantity, history) =>
  // update the quantity of a product in the cart
  dispatch => {
    return axios
      .put(`/api/orders/cart/${orderId}`, { productId, quantity })
      .then(res => {
        const cartProduct = {
          product: res.data,
          quantity
        };
        dispatch(updateProductQuantity(cartProduct));
        if (history) history.push('/cart');
      })
      .catch(err => console.log(err));
  };

export const removeFromCart = (orderId, productId) =>
  // remove a product from the cart
  dispatch =>
    axios
      .put(`/api/orders/cart/${orderId}`, { productId, quantity: 0 })
      .then(res => {
        const removedProductId = res.data.productId;
        dispatch(removeCartProduct(removedProductId));
      })
      .catch(err => console.log(err));

export const submitOrder = (address, history) =>
  // add an address to the order and convert status to 'Processing', then reset the cart
  // redirect to confirmation page
  dispatch =>
    axios
      .put(`/api/orders/checkout`, { address })
      .then(res => {
        const orderId = res.data.id;
        dispatch(fetchCart());
        history.push(`/confirmation/${orderId}`);
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(
  state = { id: null, cartProducts: [], address: '' },
  action
) {
  switch (action.type) {
    case GET_CART:
      return action.cart;

    case ADD_CART_PRODUCT:
      return Object.assign({}, state, {
        cartProducts: [...state.cartProducts, action.cartProduct]
      });

    case UPDATE_PRODUCT_QUANTITY:
      return Object.assign({}, state, {
        cartProducts: [
          ...state.cartProducts.filter(cartProduct => {
            return cartProduct.product.id !== action.cartProduct.product.id;
          }),
          action.cartProduct
        ]
      });

    case REMOVE_CART_PRODUCT:
      return Object.assign({}, state, {
        cartProducts: [
          ...state.cartProducts.filter(cartProduct => {
            return cartProduct.product.id !== action.removedProductId;
          })
        ]
      });

    default:
      return state;
  }
}
