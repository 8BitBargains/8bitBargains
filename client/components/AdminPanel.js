import React, { Component } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';

import AllOrders from './AllOrders';

class AdminPanel extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  render() {
    return (
      <div>
        <Header as="h1">Administrator Panel</Header>
        <AllOrders />
      </div>
    );
  }
}

export default AdminPanel;
