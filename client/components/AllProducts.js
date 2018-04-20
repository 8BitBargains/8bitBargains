import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, addToCart } from '../store';

const mapState = (state) => {
  return {
    products: state.products,
    searchEntry: state.searchEntry
  };
};

const mapDispatch = (dispatch, ownProps) => {
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

    // filters products based on search input contents
    const products = this.props.products.filter(product => {
      return product.title.toLowerCase().match(this.props.searchEntry);
    });

    return (
      <div className="all-products-container">
        <Card.Group>
          {products && products.map(product => (
            <Card key={product.id} link>
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
