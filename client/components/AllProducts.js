import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';

const mapState = (state) => {
  return {
    products: state.products
  };
};

const mapDispatch = {
  loadAllProducts: fetchProducts
};

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.props.products && this.props.products.map(product => (
          <Card as={Link} to={`/products/${product.id}`} key={product.id}>
            <Image src={product.coverUrl} />
            <Card.Content>
              <Card.Header>{product.title}</Card.Header>
              <Card.Meta>Price: {displayPrice(product.price)}</Card.Meta>
              <Card.Description>{truncate(product.description)}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  }
}

const AllProductsContainer = connect(mapState, mapDispatch)(AllProducts);

export default AllProductsContainer;
