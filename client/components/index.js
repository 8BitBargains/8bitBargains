/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as UserHome } from './user-home';
export { Login, Signup } from './auth-form';
export { default as SidebarFilter } from './SidebarFilter';
export { default as BrowseProducts } from './BrowseProducts';
export { default as AllProducts } from './AllProducts';
export { default as SingleProduct } from './SingleProduct';
export { default as Cart } from './Cart';
export { default as Checkout } from './Checkout';
export { default as AllOrders } from './AllOrders';
export { default as AdminPanel } from './AdminPanel';
export { default as SingleOrder } from './SingleOrder';
export { default as Confirmation } from './Confirmation';

