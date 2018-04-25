import React from 'react';
import { Table } from 'semantic-ui-react';
import OrderItem from './OrderItem';
import { displayPrice, subtotal, parseAddress } from '../utils';

const Order = props => {
  if (props.order) {
    let order = props.order;
    let orderProducts = [];
    // builds orderProducts array which will be used
    // by the imported subtotal function
    order.products.forEach(product => {
      orderProducts.push({product, quantity: product.product_order.quantity});
    });
    
    let address = order.address ? parseAddress(order.address) : { name: '', address: '', city: '', state: '', country: '' }

    return (
      <Table padded="very" singleLine fixed color="green">
        <Table.Header>
          <Table.Row>
            <Table.Cell>Order no. {order.id}</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orderProducts && orderProducts.map(item => <OrderItem quantity={item.quantity} key={item.product.id} item={item.product} />)}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>Name: {address.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Address line 1: {address.address}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Address line 2: {address.city}, {address.state} {address.country}
            </Table.Cell>
            <Table.Cell textAlign="right">
              Total: {displayPrice(subtotal(orderProducts))}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  } else {
    return null;
  }
};

export default Order;
