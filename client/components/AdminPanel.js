import React, { Component } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';

import AllOrders from './AllOrders';
import AllUsers from './AllUsers';

class AdminPanel extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };

    this.fetchAllUsers = this.fetchAllUsers.bind(this);
  }

  fetchAllUsers() {
    axios
      .get('/api/users')
      .then(res => res.data)
      .then(users => this.setState({users}))
      .catch(console.error.bind(console));
  }

  componentDidMount() {
    this.fetchAllUsers;
  }

  render() {
    return (
      <div>
        <Header as="h1">Administrator Panel</Header>
          <Header as="h2">All Users</Header>
          <AllUsers users={this.state.users} />

          <Header as="h2">All Orders</Header>
          <AllOrders />
      </div>
    );
  }
}

export default AdminPanel;
