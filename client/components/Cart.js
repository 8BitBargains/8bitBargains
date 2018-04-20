import React, { Component } from 'react';
import { List, Image, Input, Container, Button } from 'semantic-ui-react';
import { displayPrice, truncate } from '../utils';
import { connect } from 'react-redux';
import { fetchCart, updateCart } from '../store';

const ItemList = (props) => {
  console.log('ItemList props: ', props);

  const { items, handleChange } = props;

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
                  <Input action={{content: 'Update', onClick:(event, data) => handleChange(item, event, data)}} placeholder={item.game_order.quantity} />
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
    // console.log('Cart props = ', this.props);
    if ( this.props.cart.games ) {
      return (
        <Container>
          <ItemList items={this.props.cart.games} handleChange={this.props.handleChange} />
          <h1>Subtotal: {displayPrice(this.subtotal())}</h1>
          <Button positive>Check Out</Button>
        </Container>
      );
    } else {
      return <h3>Add some games to your cart!</h3>;
    }
  }
}

const mapState = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCart: () => {
      dispatch(fetchCart());
    },
    handleChange: (game, event, data) => {
      console.log('handleChange event, data: ', event, data.value)
      dispatch(updateCart(game, data.value));
    }
  };
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
