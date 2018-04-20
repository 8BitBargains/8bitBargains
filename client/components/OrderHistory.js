import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

const fakeOrders = [
  {id: 1, address:'123 fake st', imageUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Pokemon_Ruby_NA.jpg/220px-Pokemon_Ruby_NA.jpg'},
  {id: 2, address: '125 fake st', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Legend_of_Legaia_Coverart.png/220px-Legend_of_Legaia_Coverart.png'}
]



const mapState = (state) => {
  return {
    orders: fakeOrders
  };
};

class OrderHistory extends Component {
  render() {
    return (
      <div className="order-history-container">
        <Item.Group>
          {this.props.orders.map(order => (
            <Item key={order.id}>
              <Item.Header>An Item</Item.Header>
              <Item.Image src={order.imageUrl} />
              <Item.Content>
                <Item.Description>{order.address}</Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
    );
  }
}

const OrderHistoryContainer = connect(mapState)(OrderHistory);

export default OrderHistoryContainer;
