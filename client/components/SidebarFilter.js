import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu } from 'semantic-ui-react';

// const mapState = (state) => {
//   return {
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//   };
// };

export default class SidebarFilter extends React.Component {
  handleItemClick = name => this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state || {};

    return (
      <Sidebar as={Menu} animation="overlay" visible={true} vertical>
        <Menu.Item>
          <Menu.Header>FILTER PRODUCTS</Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Example Header</Menu.Header>
          <Menu.Menu>
            <Menu.Item name="example menu item" active={activeItem === 'example menu item'} onClick={this.handleItemClick} />
            <Menu.Item name="example menu item" active={activeItem === 'example menu item'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Example Header</Menu.Header>
          <Menu.Menu>
            <Menu.Item name="example menu item" active={activeItem === 'example menu item'} onClick={this.handleItemClick} />
            <Menu.Item name="example menu item" active={activeItem === 'example menu item'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu.Item>
      </Sidebar >
    );
  }
}

// const SidebarFilterContainer = connect(mapState, mapDispatch)(SidebarFilter);

// export default SidebarFilterContainer;
