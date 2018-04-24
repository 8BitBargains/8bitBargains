import React from 'react';
import { Container, Header, Image, Button, Segment } from 'semantic-ui-react';
import { displayPrice } from '../utils';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';
import { AllProducts } from '.';

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

  componentWillReceiveProps(nextProps) {
    // this.props.loadSingleProduct();
    console.log('this.props id', this.props.selectedProduct.id);
    console.log('nextprops id', nextProps.selectedProduct.id);
    if (this.props.selectedProduct.id !== nextProps.selectedProduct.id) {
      this.props.loadSingleProduct();
    }
  }

  render() {
    const handleAddButton = this.props.handleAddButton;
    const cart = this.props.cart;
    const product = this.props.selectedProduct;
    return (
      Object.keys(product).length ?
        <Container className="singleProduct">
          <Segment.Group>
            <Segment>
              <Image src={product.coverUrl} />
              <Header as="h1">{product.title}</Header>
              <Header as="h2">Price: {displayPrice(product.price)}</Header>
              <p>{product.description}</p>
              <Button onClick={() => handleAddButton(cart, product)} positive>
                Add to Cart
          </Button>
            </Segment>
            {product.type === 'bundle' && <Segment>
              <Header as="h2">Products in this bundle</Header>
              {console.log('product', product)}
              <AllProducts
                products={product.subProduct}
                cart={this.props.cart}
                handleAddButton={this.props.handleAddButton}
              />
            </Segment>}
          </Segment.Group>
        </Container> :
        <p>Loading...</p>
    );
  }
}

const SingleProductContainer = connect(mapState, mapDispatch)(SingleProduct);

export default SingleProductContainer;
