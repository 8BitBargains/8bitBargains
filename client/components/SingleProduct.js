import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';
import { displayPrice } from '../utils';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';

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

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.loadSingleProduct();
  }

  render() {
    const product = this.props.selectedProduct;
    return (
      Object.keys(product).length ?
        <Container>
          <Image src={product.coverUrl} />
          <Header as="h1">{product.title}</Header>
          <Header as="h2">Price: {displayPrice(product.price)}</Header>
          <p>{product.description}</p>
        </Container> :
        <p>Loading...</p>
    );
  }
}

const SingleProductContainer = connect(mapState, mapDispatch)(SingleProduct);

export default SingleProductContainer;
