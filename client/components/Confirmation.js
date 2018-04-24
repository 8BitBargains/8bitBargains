import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLastOrder } from '../store';
import { SingleOrder } from './index';
import { Segment, Header } from 'semantic-ui-react'


class Confirmation extends Component {
  componentDidMount() {
    this.props.loadLastOrder();
  }

  render() {
    const { lastOrder } = this.props;
    if ( lastOrder && lastOrder.products ) {
      return (
        <Segment className="displayContainer" >
          <Header as="h1" >Congratulations! Your purchase has been confirmed!</Header>
          <Header as="h2" >For a limited time, all orders immediately dispatched by drone!*</Header>
          <Header as="h3" >Look for your products to arrive shortly on your front lawn or rooftop garden. </Header>
          <SingleOrder order={lastOrder} />
          <Header as="h4" >*Seller takes no responsibility for injuries to persons/property/pets caused by errant drones. </Header>
        </Segment>
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
