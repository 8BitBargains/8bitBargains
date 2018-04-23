import React from 'react';
import {Table} from 'semantic-ui-react';
import OrderItem from './OrderItem';
import { displayPrice } from '../utils';

const Order = props => {
  let order = props.order;
  let items = order.items;
  let total = items.map(item => item.price)
    .reduce((reducer, num) => reducer + num);

  return (
    <Table padded="very" singleLine fixed color='green' >
      <Table.Header>
        <Table.Row>
          <Table.Cell>
            Order no. {order.id}
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map(item => <OrderItem key={item.id} item={item} />)}
        <Table.Footer>
          <Table.Cell textAlign="right">
            Total: {displayPrice(total)}
          </Table.Cell>
        </Table.Footer>
      </Table.Body>
    </Table>
  );
};

export default Order;
