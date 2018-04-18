import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';
import { fetchSingleProduct } from '../store/selectedProduct';

const mapState = (state) => {
  return {
    selectedProduct: state.selectedProduct
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadSingleProduct: () => {
      dispatch(fetchSingleProduct(ownProps.match.params.productId));
    }
  };
};

const SingleProductContainer = connect(mapState, mapDispatch)(SingleProduct);

export default SingleProductContainer;
