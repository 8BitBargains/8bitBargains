import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Input, Container, Button, Form } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { connect } from 'react-redux';
import { fetchCart, updateCart, removeFromCart } from '../store';

const ItemList = props => {
  const { cartProducts, handleUpdateQuantity, handleRemoveProduct, orderId } = props;

  return (
    <List divided relaxed>
      {cartProducts.map(cartProduct => {
        return (
          <List.Item key={cartProduct.product.title}>
            <div>
              <div>
                <Link to={`/products/${cartProduct.product.id}`}>
                  <Image src={cartProduct.product.coverUrl} size="small" />
                </Link>
              </div>
              <div>
                <List.Content>
                  <Link to={`/products/${cartProduct.product.id}`}>
                    <List.Header as="h3" >{cartProduct.product.title}</List.Header>
                  </Link>
                  <List.Description as="p">
                    {truncate(cartProduct.product.description)}
                  </List.Description>
                </List.Content>
              </div>
              <div>{displayPrice(cartProduct.product.price)}</div>
              <div>

                <Form className="inline-block" onSubmit={e => handleUpdateQuantity(orderId, cartProduct.product.id, e.target.update.value)}>
                  <strong>Quantity:</strong>
                  <Input
                    name="update"
                    type="text"
                    placeholder={cartProduct.quantity}
                  />
                  <Button type="submit">Update</Button>
                </Form>
                <Button className="inline-block" negative onClick={() => handleRemoveProduct(orderId, cartProduct.product.id)}>
                  Remove
                </Button>
              </div>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart();
  }

  subtotal = () => {
    let subtotal = 0;
    this.props.cart.cartProducts.forEach(product => {
      subtotal += product.product.price * product.quantity;
    });
    return subtotal;
  };

  render() {
    if (this.props.cart.cartProducts.length) {
      return (
        <Container>
          <ItemList
            cartProducts={this.props.cart.cartProducts}
            handleUpdateQuantity={this.props.handleUpdateQuantity}
            handleRemoveProduct={this.props.handleRemoveProduct}
            orderId={this.props.cart.id}
          />
          <h1>Subtotal: {displayPrice(this.subtotal())}</h1>
          <Button positive onClick={() => this.props.history.push('/cart/process')}>Check Out</Button>
        </Container>
      );
    } else {
      return <h3>Add some products to your cart!</h3>;
    }
  }
}

const mapState = state => {
  return {
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    loadCart: () => {
      dispatch(fetchCart());
    },
    handleUpdateQuantity: (orderId, productId, quantity) => {
      if (!quantity) console.log('please enter a new quantity');
      else dispatch(updateCart(orderId, productId, quantity));
    },
    handleRemoveProduct: (orderId, productId) => {
      dispatch(removeFromCart(orderId, productId));
    }
  };
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
