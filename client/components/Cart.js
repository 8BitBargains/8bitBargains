import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Input, Container, Button, Form } from 'semantic-ui-react';
import { displayPrice, truncate, subtotal } from '../utils';
import { connect } from 'react-redux';
import { fetchCart, updateCart, removeFromCart } from '../store';

const ItemList = props => {
  const { cartProducts, handleUpdateQuantity, handleRemoveProduct, orderId } = props;

  return (
    <List divided relaxed>
      {cartProducts && cartProducts.map(cartProduct => {
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

  render() {
    const { handleRemoveProduct, handleUpdateQuantity, cart, history } = this.props;
    const cartProducts = cart.cartProducts;
    if (cartProducts.length) {
      return (
        <Container>
          <ItemList
            cartProducts={cartProducts}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveProduct={handleRemoveProduct}
            orderId={cart.id}
          />
          <h1>Subtotal: {displayPrice(subtotal(cartProducts))}</h1>
          <Button positive onClick={() => history.push('/cart/checkout')}>Check Out</Button>
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
