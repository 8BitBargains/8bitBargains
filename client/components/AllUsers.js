import React from 'react';
import { Header } from 'semantic-ui-react';

const AllUsers = props => (
  <div>
    <Header as="h2">All Users</Header>
    {props.users ? (
      props.users.map()
    )}
  </div>
)
