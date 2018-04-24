import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLastOrder } from '../store';
import { SingleOrder } from './index';


class Confirmation extends Component {
  componentDidMount() {
    this.props.loadLastOrder();
  }

  render() {
    const { lastOrder } = this.props;
    if ( lastOrder && lastOrder.products ) {
      return (
        <SingleOrder order={lastOrder} />
      );
    } else {
      return null;
    }
  }
}

const mapState = state => {
  return {
    lastOrder: state.lastOrder
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadLastOrder: () => dispatch(fetchLastOrder(+ownProps.match.params.orderId))
  };
};

const ConfirmationContainer = connect(mapState, mapDispatch)(
  Confirmation
);

export default ConfirmationContainer;
