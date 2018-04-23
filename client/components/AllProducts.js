import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { Link } from 'react-router-dom';


export default function AllProducts(props) { // Geoff:  de-structure props for less code Lines 8-10
  const handleAddButton = props.handleAddButton;
  const products = props.products;
  const cart = props.cart;

  return (
    <div className="all-products-container">
      <Card.Group>
        {products && products.map(product => ( // Geoff:  return just a function, make a single product card component -- modularity!
          <Card key={product.id} link>
            <Image
              src={product.coverUrl}
              centered size="small"
              as={Link} to={`/products/${product.id}`}
            />
            <Card.Content>
              <Card.Header as={Link} to={`/products/${product.id}`}>{product.title}</Card.Header>
              <Card.Meta>{product.system.name}</Card.Meta>
              <Card.Description>{truncate(product.description)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="card-price-button">
                <span className="card-price">{displayPrice(product.price)}</span>
                <Button className="card-button" onClick={
                  () => handleAddButton(cart, product)
                } positive>Add to Cart</Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
