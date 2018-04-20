import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu, Image } from 'semantic-ui-react';

class Navbar extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Image src={'/logo2.jpg'} alt="8 Bit Bargains" className="logo" />
        <Menu tabular className="nav-menu">
          {this.props.isLoggedIn ? (
            <Menu.Menu>
              {/* The navbar will show these links after you log in */}
              <Menu.Item
                as={Link} to="/home"
                name="home"
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              >
                Home
              </Menu.Item>
              <Menu.Item
                as={Link} to="/logout"
                name="logout"
                onClick={this.props.handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Menu>
          ) : (
              <Menu.Menu>
                {/* The navbar will show these links before you log in */}
                <Menu.Item
                  as={Link} to="/login"
                  name="login"
                  active={activeItem === 'login'}
                  onClick={this.handleItemClick}
                >
                  Login
                </Menu.Item>
                <Menu.Item
                  as={Link} to="/signup"
                  name="signup"
                  active={activeItem === 'signup'}
                  onClick={this.handleItemClick}
                >
                  Signup
                </Menu.Item>
              </Menu.Menu>
            )}
          {/* The navbar will always show these links */}
          <Menu.Menu>
            <Menu.Item
              as={Link} to="/products"
              name="browse"
              active={activeItem === 'browse'}
              onClick={this.handleItemClick}
            >
              Browse
            </Menu.Item>
            <Menu.Item
              as={Link} to="/cart"
              name="cart"
              active={activeItem === 'cart'}
              onClick={this.handleItemClick}
            >
              Cart
            </Menu.Item>
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
    isLoggedIn: !!state.user.id
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
