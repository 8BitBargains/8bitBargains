import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

import { fetchUserOrders } from '../store';
import SingleOrder from './SingleOrder';

const mapState = state => {
  return {
    orders: state.orders,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    loadOrders: isAdmin => dispatch(fetchUserOrders(isAdmin))
  };
};

class AllOrders extends Component {
  componentDidMount() {
    this.props.loadOrders(this.props.isAdmin);
  }

  render() {
    let orders = this.props.orders;
    return (
      <div className="order-history-container">
        <Item.Group>
          {orders.map(order => <SingleOrder key={order.id} order={order} />)}
        </Item.Group>
      </div>
    );
  }
}

const AllOrdersContainer = connect(mapState, mapDispatch)(AllOrders);

export default AllOrdersContainer;
