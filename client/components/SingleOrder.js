import React from 'react';
import { Table } from 'semantic-ui-react';
import OrderItem from './OrderItem';
import { displayPrice } from '../utils';
import { parseAddress } from '../utils';

const Order = props => {
  if (props.order) {
    let order = props.order;
    let products = order.products;

    let total =
      products && products.length
        ? products
            .map(item => item.price)
            .reduce((reducer, num) => reducer + num)
        : 0;

    let address = parseAddress(order.address);
    console.log(order.address);
    console.log(address);

    return (
      <Table padded="very" singleLine fixed color="green">
        <Table.Header>
          <Table.Row>
            <Table.Cell>Order no. {order.id}</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products &&
            products.map(item => <OrderItem key={item.id} item={item} />)}
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
              Total: {displayPrice(total)}
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
