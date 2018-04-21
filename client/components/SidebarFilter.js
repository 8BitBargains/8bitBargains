import React from 'react';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import { alphaSort } from '../utils';

export default class SidebarFilter extends React.Component {
  state = {};

  handleItemClick = name => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    const genres = this.props.genres;
    const systems = this.props.systems;

    const createOptions = (array) => {
      return [{
        key: 0,
        text: '-',
        value: null
      }].concat(alphaSort(array, 'name').map(elem => {
        return {
          key: elem.id,
          text: elem.name,
          value: elem.id
        };
      }));
    };

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
        <Menu.Item>
          <Menu.Header>Genre</Menu.Header>
          <Menu.Menu>
            <Dropdown
              placeholder="Select Genre"
              fluid search
              selection options={createOptions(genres)}
              onChange={this.props.handleGenreChange}
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Console</Menu.Header>
          <Menu.Menu>
            <Dropdown
              placeholder="Select Console"
              fluid search
              selection options={createOptions(systems)}
              onChange={this.props.handleSystemChange}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}
