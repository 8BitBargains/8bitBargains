import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import cart from './cart';
import products from './products';
import selectedProduct from './selectedProduct';

const reducer = combineReducers({ user, products, selectedProduct, cart });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
export * from './selectedProduct';
export * from './cart';
