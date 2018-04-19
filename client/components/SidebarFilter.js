import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { sortProducts } from '../store';


// const mapState = (state) => {
//   return {
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    sortProducts: (field, direction) => {
      dispatch(sortProducts(field, direction));
    }
  };
};

class SidebarFilter extends React.Component {
  handleItemClick = name => this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state || {};

    return (
      <Menu vertical className="browse-sidebar">
        <Menu.Item>
          <Menu.Header>FILTER PRODUCTS</Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Price</Menu.Header>
          <Menu.Menu>
            <Menu.Item name="ascending" active={activeItem === 'ascending'} onClick={() => {
              this.props.sortProducts('price', 'asc');
              this.handleItemClick();
            }} />
            <Menu.Item name="descending" active={activeItem === 'descending'} onClick={() => {
              this.props.sortProducts('price', 'desc');
              this.handleItemClick();
            }} />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Title</Menu.Header>
          <Menu.Menu>
            <Menu.Item name="ascending" active={activeItem === 'ascending'} onClick={() => {
              this.props.sortProducts('title', 'asc');
              this.handleItemClick();
            }} />
            <Menu.Item name="descending" active={activeItem === 'descending'} onClick={() => {
              this.props.sortProducts('title', 'desc');
              this.handleItemClick();
            }} />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

const SidebarFilterContainer = connect(null, mapDispatch)(SidebarFilter);

export default SidebarFilterContainer;
