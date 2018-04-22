import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { Link } from 'react-router-dom';


export default function AllProducts(props) {
  const handleAddProduct = props.handleAddProduct;
  const handleUpdateProduct = props.handleUpdateProduct;
  const products = props.products;
  const cart = props.cart;

  return (
    <div className="all-products-container">
      <Card.Group>
        {products && products.map(product => (
          <Card key={product.id} link>
            <Image as={Link} to={`/products/${product.id}`} src={product.coverUrl} />
            <Card.Content>
              <Card.Header as={Link} to={`/products/${product.id}`}>{product.title}</Card.Header>
              <Card.Meta>{product.system.name}</Card.Meta>
              <Card.Description>{truncate(product.description)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="card-price-button">
                <span className="card-price">{displayPrice(product.price)}</span>
                <Button className="card-button" onClick={
                  () => {
                    // check if product is in cart to determine handler

                    // find cartProducts that match product
                    const matchingProducts = cart.cartProducts.filter(
                      cartProduct => cartProduct.game.id === product.id
                    );

                    const productInCart = matchingProducts[0];

                    if (productInCart) {
                      console.log('productInCart ', productInCart);
                      handleUpdateProduct(cart.id, product.id, productInCart.quantity + 1);
                    }
                    else handleAddProduct(product);
                  }
                } positive>Add to Cart</Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

