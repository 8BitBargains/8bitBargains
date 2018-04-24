import React from 'react';
import { Header } from 'semantic-ui-react';

import AllOrders from './AllOrders';
import AllUsers from './AllUsers';

const AdminPanel = () => (
  <div>
    <Header as="h1">Administrator Panel</Header>
      <Header as="h2">All Users</Header>
      <AllUsers />

      <Header as="h2">All Orders</Header>
      <AllOrders />
  </div>
);

export default AdminPanel;
