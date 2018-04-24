import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import axios from 'axios';

// This component is intentionally kept separate from the
// redux store, since this information is not needed anywhere else

export default class AllUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };

    this.fetchAllUsers = this.fetchAllUsers.bind(this);
    this.toggleAdminStatus = this.toggleAdminStatus.bind(this);
  }

  fetchAllUsers() {
    axios
      .get('/api/users')
      .then(res => res.data)
      .then(users => this.setState({users}))
      .catch(console.error.bind(console));
  }

  toggleAdminStatus(userId, userIndex) {
    axios
      .put('/api/users/adminStatus', {userId})
      .then(res => res.status)
      .then(statusCode => {
        if(statusCode === 204) {
          this.fetchAllUsers();
        }
      })
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  render() {
    return (
      <div>
        {this.state.users ? (
          this.state.users.map((user, index) => (
            <div key={user.id}>
              <p>
                User no. {user.id}, email: {user.email}
              </p>
              <Button
                onClick={() => this.toggleAdminStatus(user.id, index)}
              >
                {user.isAdmin ? 'Remove' : 'Make'} Admin
              </Button>
            </div>
          ))
        ) : (
          <p>No users to show!</p>
        )}
      </div>
    );
  }
}
