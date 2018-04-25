import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu, Image } from 'semantic-ui-react';

class Navbar extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  // Created to make this file more DRY
  standardNavItem = (text, activeItem, handleClick = this.handleItemClick) => {
    let displayText = text.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

    return (
      <Menu.Item
        as={Link}
        to={`/${text}`}
        name={text}
        active={activeItem === text}
        onClick={handleClick}
      >
        {displayText}
      </Menu.Item>
  )};

  render() {
    const { activeItem } = this.state;
    const navItem = this.standardNavItem;

    return (
      <div>
        <Image src={'/logo2.jpg'} alt="8 Bit Bargains" className="logo" />
        <Menu tabular className="nav-menu">
          {this.props.isLoggedIn ? (
            <Menu.Menu>
              {/* The navbar will show these links after you log in */}
              {navItem('home', activeItem)}
              {navItem('order-history', activeItem)}
              {navItem('logout', activeItem, this.props.handleLogout)}
            </Menu.Menu>
          ) : (
              <Menu.Menu>
                {/* The navbar will show these links before you log in */}
                {navItem('login', activeItem)}
                {navItem('signup', activeItem)}
              </Menu.Menu>
            )}

          {this.props.isAdmin && (
            <Menu.Menu>
              {navItem('admin', activeItem)}
            </Menu.Menu>
          )}

          {/* The navbar will always show these links */}
          <Menu.Menu>
            {navItem('products', activeItem)}
            {navItem('cart', activeItem)}
          </Menu.Menu>
        </Menu>
        <br />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
