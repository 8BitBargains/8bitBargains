import React, { Component } from 'react';
import { List, Image, Input, Container, Button, Form } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { connect } from 'react-redux';
import { fetchCart, updateCart, removeFromCart } from '../store';

const ItemList = props => {
  const { products, handleSubmit, handleClick, orderId } = props;

  return (
    <List divided relaxed>
      {products.map(product => {
        return (
          <List.Item key={product.game.title}>
            <div>
              <div>
                <Image src={product.game.coverUrl} size="small" />
              </div>
              <div>
                <List.Content>
                  <List.Header as="h3">{product.game.title}</List.Header>
                  <List.Description as="p">
                    {truncate(product.game.description)}
                  </List.Description>
                </List.Content>
              </div>
              <div>{displayPrice(product.game.price)}</div>
              <div>
                <Form onSubmit={e => handleSubmit(orderId, product, e.target.update.value)}>
                  <Input
                    name="update"
                    type="text"
                    placeholder={product.quantity}
                  />
                  <Button type="submit">Update</Button>
                </Form>
                <Button negative onClick={() => handleClick(product)}>
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
    this.props.cart.games.forEach(product => {
      subtotal += product.game.price * product.quantity;
    });
    return subtotal;
  };

  render() {
    if (this.props.cart.games) {
      return (
        <Container>
          <ItemList
            products={this.props.cart.games}
            handleSubmit={this.props.handleSubmit}
            handleClick={this.props.handleClick}
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
    handleSubmit: (orderId, game, quantity) => {
      dispatch(updateCart(orderId, game, quantity));
    },
    handleClick: game => {
      dispatch(removeFromCart(game));
    }
  };
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
