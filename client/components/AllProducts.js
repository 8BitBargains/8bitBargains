import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, addToCart } from '../store';

const mapState = (state) => {
  // union of the state address
  return {
    products: state.products
  };
};

const mapDispatch = (dispatch, ownProps) => {
  // handle clicks and load dem products
  return {
    loadAllProducts: () => {
      dispatch(fetchProducts());
    },
    handleClick: (product) => {
      dispatch(addToCart(product, ownProps.history));
    }
  };
};

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    const handleClick = this.props.handleClick;
    return (
      <div className="all-products-container">
        <Card.Group>
          {this.props.products && this.props.products.map(product => (
            <Card key={product.id}>
              <Image as={Link} to={`/products/${product.id}`} src={product.coverUrl} />
              <Card.Content>
                <Card.Header as={Link} to={`/products/${product.id}`}>{product.title}</Card.Header>
                <Card.Meta>Price: {displayPrice(product.price)}</Card.Meta>
                <Card.Description>{truncate(product.description)}</Card.Description>
                <Button onClick={() => handleClick(product)} positive>Add to Cart</Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

const AllProductsContainer = connect(mapState, mapDispatch)(AllProducts);

export default AllProductsContainer;
