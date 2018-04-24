import React from 'react';
import { Button } from 'semantic-ui-react';

const AllUsers = props => (
  <div>
    {props.users ? props.users.map(user => (
      <p key={user.id}>User no. {user.id}, email: {user.email}</p>
      <Button>
        {user.isAdmin ? 'Remove' : 'Make'} Admin
      </Button>
    )) : <p>No users to show!</p>}
  </div>
)

export default AllUsers;
