import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import cart from './cart';
import products from './products';
import selectedProduct from './selectedProduct';
import searchEntry from './sidebar/searchEntry';
import genreEntry from './sidebar/genreEntry';
import systemEntry from './sidebar/systemEntry';
import genres from './genres';
import systems from './systems';
import orders from './orders';
import lastOrder from './lastOrder';

const reducer = combineReducers({
  user,
  products,
  selectedProduct,
  cart,
  searchEntry,
  genreEntry,
  systemEntry,
  genres,
  systems,
  orders,
  lastOrder
});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
export * from './selectedProduct';
export * from './sidebar/searchEntry';
export * from './sidebar/genreEntry';
export * from './sidebar/systemEntry';
export * from './cart';
export * from './genres';
export * from './systems';
export * from './orders';
export * from './lastOrder';
