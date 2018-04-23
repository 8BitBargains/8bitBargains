import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

import { fetchUserOrders } from '../store';
import Order from './Order';

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
