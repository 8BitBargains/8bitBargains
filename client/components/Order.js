import React from 'react';
import {Table} from 'semantic-ui-react';
import OrderItem from './OrderItem';
import {displayPrice} from '../utils';

const Order = props => {
  let order = props.order;
  let products = order.products;

  let total = !products.length
    ? 0
    : products.map(item => item.price).reduce((reducer, num) => reducer + num);

  return (
    <Table padded="very" singleLine fixed color="green">
      <Table.Header>
        <Table.Row>
          <Table.Cell>
            Order no. {order.id}
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products.map(item => <OrderItem key={item.id} item={item} />)}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>
            Address: {order.address}
          </Table.Cell>
          <Table.Cell textAlign='right'>
            Total: {displayPrice(total)}
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default Order;
