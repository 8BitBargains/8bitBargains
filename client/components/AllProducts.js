import React from 'react';
import { Card, Image, Button, Label } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { Link } from 'react-router-dom';

export default function AllProducts(props) {
  const handleAddButton = props.handleAddButton;
  const products = props.products;
  const cart = props.cart;

  return (
    <div className="all-products-container">
      <Card.Group>
        {products &&
          products.map(product => (
            <Card key={product.id} link>
              <Image
                src={product.coverUrl}
                centered
                size="small"
                as={Link}
                to={`/products/${product.id}`}
              />
              <Card.Content>
                <Card.Header as={Link} to={`/products/${product.id}`}>
                  {product.title}
                </Card.Header>
                <Card.Meta>{product.system && product.system.name}</Card.Meta>
                <Card.Description>
                  {truncate(product.description)}
                </Card.Description>
              </Card.Content>
              {product.inventory < 5 &&
                product.inventory > 0 && (
                  <Card.Content>
                    <Label ribbon color="red">
                      Only {product.inventory} left in stock!
                    </Label>
                  </Card.Content>
                )}
              <Card.Content extra>
                <div className="card-price-button">
                  <span className="card-price">
                    {displayPrice(product.price)}
                  </span>
                  {product.inventory ? (
                    <Button
                      className="card-button"
                      onClick={() => handleAddButton(cart, product)}
                      positive
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button className="card-button" disabled>
                      Out of Stock
                    </Button>
                  )}
                </div>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </div>
  );
}
