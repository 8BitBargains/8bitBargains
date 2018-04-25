import React from 'react';
import { Table } from 'semantic-ui-react';
import { displayPrice } from '../utils';

const OrderItem = props => {
  let item = props.item;
  return (
    <Table.Row>
      <Table.Cell>
        <Table.Header as="h3">{item.title}</Table.Header>
      </Table.Cell>
      <Table.Cell>
        <p>description: {item.description}</p>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <p>Price: {displayPrice(item.price)}</p>
      </Table.Cell>
      <Table.Cell>
        <p> Quantity: {props.quantity}</p>
      </Table.Cell>
    </Table.Row>
  );
};

export default OrderItem;
