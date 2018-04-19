import React from 'react';
import { SidebarFilter, AllProducts } from './index';


export default function BrowseProducts() {
  return (
    <div className="browse-products-container">
      <SidebarFilter />
      <AllProducts />
    </div>
  );
}

