import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLastOrder } from '../store';
import { SingleOrder } from './index';

const mapState = state => {
  return {
    lastOrder: state.lastOrder
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadLastOrder: () => dispatch(fetchLastOrder(ownProps.match.params.id))
  };
};

class Confirmation extends Component {
  componentDidMount() {
    this.props.loadLastOrder();
  }

  render() {
    console.log('!!!!!!!lastOrder', this.lastOrder)
    return (
    <SingleOrder order={this.lastOrder} />
    );
  }
}

const ConfirmationContainer = connect(mapState, mapDispatch)(
  Confirmation
);

export default ConfirmationContainer;
