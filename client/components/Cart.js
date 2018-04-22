import React, { Component } from 'react';
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
          <List.Item key={cartProduct.game.title}>
            <div>
              <div>
                <Image src={cartProduct.game.coverUrl} size="small" />
              </div>
              <div>
                <List.Content>
                  <List.Header as="h3">{cartProduct.game.title}</List.Header>
                  <List.Description as="p">
                    {truncate(cartProduct.game.description)}
                  </List.Description>
                </List.Content>
              </div>
              <div>{displayPrice(cartProduct.game.price)}</div>
              <div>
                <Form onSubmit={e => handleUpdateQuantity(orderId, cartProduct.game.id, e.target.update.value)}>
                  <Input
                    name="update"
                    type="text"
                    placeholder={cartProduct.quantity}
                  />
                  <Button type="submit">Update</Button>
                </Form>
                <Button negative onClick={() => handleRemoveProduct(orderId, cartProduct.game.id)}>
                  Remove Item
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
      subtotal += product.game.price * product.quantity;
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
      return <h3>Add some games to your cart!</h3>;
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
      dispatch(updateCart(orderId, productId, quantity));
    },
    handleRemoveProduct: (orderId, productId) => {
      dispatch(removeFromCart(orderId, productId));
    }
  };
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
