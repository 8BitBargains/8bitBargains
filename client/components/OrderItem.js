import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import { displayPrice } from '../utils';

const OrderItem = props => {
  let item = props.item;
  return (
    <Table.Row>
      <Table.Cell>
        <Table.Header as="h3">{item.title}</Table.Header>
      </Table.Cell>
      <Table.Cell>
        <p>{item.description}</p>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <p>{displayPrice(item.price)}</p>
      </Table.Cell>
    </Table.Row>
  );
};

export default OrderItem;
