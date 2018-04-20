import React from 'react';
import { Container, Header, Image, Button } from 'semantic-ui-react';
import { displayPrice } from '../utils';
import { connect } from 'react-redux';
import { fetchSingleProduct, addToCart } from '../store';

const mapState = (state) => {
  // union of the state address
  return {
    selectedProduct: state.selectedProduct
  };
};

const mapDispatch = (dispatch, ownProps) => {
  // load single product and handle clicks
  return {
    loadSingleProduct: () => {
      dispatch(fetchSingleProduct(ownProps.match.params.productId));
    },
    handleClick: (product) => {
      dispatch(addToCart(product, ownProps.history));
    }
  };
};

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.loadSingleProduct();
  }

  render() {
    const handleClick = this.props.handleClick;
    const product = this.props.selectedProduct;
    return (
      Object.keys(product).length ?
        <Container>
          <Image src={product.coverUrl} />
          <Header as="h1">{product.title}</Header>
          <Header as="h2">Price: {displayPrice(product.price)}</Header>
          <p>{product.description}</p>
          <Button onClick={() => handleClick(product)} positive>Add to Cart</Button>
        </Container> :
        <p>Loading...</p>
    );
  }
}

const SingleProductContainer = connect(mapState, mapDispatch)(SingleProduct);

export default SingleProductContainer;
