import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

import { fetchUserOrders } from '../store';
import Order from './Order';

const fakeOrders = [
  {id: 1, address:'123 fake st', imageUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Pokemon_Ruby_NA.jpg/220px-Pokemon_Ruby_NA.jpg'},
  {id: 2, address: '125 fake st', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Legend_of_Legaia_Coverart.png/220px-Legend_of_Legaia_Coverart.png'}
]



const mapState = (state) => {
  return {
    orders: state.orders
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadOrders: () => dispatch(fetchUserOrders())
  }
}

class OrderHistory extends Component {
  componentDidMount() {
    this.props.loadOrders();
  }

  render() {
    let orders = this.props.orders;

    return (
      <div className="order-history-container">
        <Item.Group>
          {orders.map(order => <Order key={order.id} order={order} />)}
        </Item.Group>
      </div>
    );
  }
}

const OrderHistoryContainer = connect(mapState, mapDispatch)(OrderHistory);

export default OrderHistoryContainer;
