import { connect } from 'react-redux';
import AllProducts from './AllProducts';
import { fetchProducts } from '../store/products';

const mapState = (state) => {
  return {
    products: state.products
  };
};

const mapDispatch = {
  loadAllProducts: fetchProducts
};

const AllProductsContainer = connect(mapState, mapDispatch)(AllProducts);

export default AllProductsContainer;
