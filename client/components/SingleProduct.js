import React from 'react';
import { Container, Header, Image, Button } from 'semantic-ui-react';
import { displayPrice } from '../utils';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';

const mapState = (state) => {
  // union of the state address
  return {
    cart: state.cart,
    selectedProduct: state.selectedProduct
  };
};

const mapDispatch = (dispatch, ownProps) => {
  // load single product and handle clicks
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
    const handleAddButton = this.props.handleAddButton;
    const cart = this.props.cart;
    const product = this.props.selectedProduct;
    return (
      Object.keys(product).length ?
        <Container>
          <Image src={product.coverUrl} />
          <Header as="h1">{product.title}</Header>
          <Header as="h2">Price: {displayPrice(product.price)}</Header>
          <p>{product.description}</p>
          <Button onClick={() => handleAddButton(cart, product)} positive>
            Add to Cart
          </Button>
        </Container> :
        <p>Loading...</p>
    );
  }
}

const SingleProductContainer = connect(mapState, mapDispatch)(SingleProduct);

export default SingleProductContainer;
