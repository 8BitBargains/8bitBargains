import React from 'react';
import { SidebarFilter, AllProducts } from './index';


export default function BrowseProducts(props) {
  return (
    <div className="browse-products-container">
      <SidebarFilter />
      <AllProducts history={props.history} />
    </div>
  );
}

