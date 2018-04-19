import React, { Component } from 'react';
import { List, Image, Input, Container, Button } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { connect } from 'react-redux';
import { fetchCart } from '../store';

const ItemList = (props) => {

  const { items } = props;

  return (

    <List divided relaxed>
      {
        items.map( item => {
          return (
            <List.Item key={item.title}>
              <div>
                <div>
                <Image src={item.coverUrl} size='small' />
                </div>
                <div>
                  <List.Content>
                    <List.Header as='h3'>{item.title}</List.Header>
                    <List.Description as='p'>{truncate(item.description)}</List.Description>
                  </List.Content>
                </div>
                <div>
                  {displayPrice(item.price)}
                </div>
                <div>
                  <Input action='Update' placeholder={item.game_order.quantity} />
                  <Button negative>Remove Item</Button>
                </div>
              </div>
            </List.Item>
          );
        })
      }
    </List>
  );
};

class Cart extends Component {

  componentDidMount() {
    this.props.loadCart();
  }

  subtotal = () => {
    let subtotal = 0;
    this.props.cart.games.forEach(item => {
      subtotal += item.price * item.game_order.quantity;
    });
    return subtotal;
  }

  render(){
    console.log(this.props)
    if ( this.props.cart.games ) {
      return (
        <Container>
          <ItemList items={this.props.cart.games} />;
          <h1>Subtotal: {displayPrice(this.subtotal())}</h1>
          <Button positive>Check Out</Button>
        </Container>
      );
    } else {
      return null
    }
  }
}

const mapState = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatch = {
    loadCart: fetchCart
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
