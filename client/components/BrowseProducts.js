import React from 'react';
import { SidebarFilter, AllProducts } from './index';
import { Sidebar, Segment, Menu } from 'semantic-ui-react';


export default function BrowseProducts() {
  return (
    <div>
      <Sidebar.Pushable as={Segment}>
        <SidebarFilter />
        <Sidebar.Pusher>
          <Segment basic>
            <AllProducts />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}

