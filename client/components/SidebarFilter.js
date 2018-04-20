import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Input } from 'semantic-ui-react';
import { sortProducts, writeSearchEntry } from '../store';


// const mapState = (state) => {
//   return {
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    sortProducts: (field, direction) => {
      dispatch(sortProducts(field, direction));
    },
    handleSearchChange: event => {
      dispatch(writeSearchEntry(event.target.value));
    }
  };
};

class SidebarFilter extends React.Component {
  state = {};

  handleItemClick = name => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu vertical className="browse-sidebar">
        <Menu.Item>
          <Menu.Header>SEARCH PRODUCTS</Menu.Header>
          <Input
            placeholder="Search..."
            onChange={this.props.handleSearchChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>FILTER PRODUCTS</Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Price</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="price-ascending"
              active={activeItem === 'price-ascending'}
              onClick={() => {
                this.props.sortProducts('price', 'asc');
                this.handleItemClick('price-ascending');
              }}>
              Ascending
              </Menu.Item>
            <Menu.Item
              name="price-descending"
              active={activeItem === 'price-descending'}
              onClick={() => {
                this.props.sortProducts('price', 'desc');
                this.handleItemClick('price-descending');
              }}>
              Descending
              </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Title</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="title-ascending"
              active={activeItem === 'title-ascending'}
              onClick={() => {
                this.props.sortProducts('title', 'asc');
                this.handleItemClick('title-ascending');
              }}>
              Ascending
              </Menu.Item>
            <Menu.Item
              name="title-descending"
              active={activeItem === 'title-descending'}
              onClick={() => {
                this.props.sortProducts('title', 'desc');
                this.handleItemClick('title-descending');
              }}>
              Descending
              </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

const SidebarFilterContainer = connect(null, mapDispatch)(SidebarFilter);

export default SidebarFilterContainer;
