import React from 'react';
import { connect } from 'react-redux';
import { SidebarFilter, AllProducts } from './index';
import {
  fetchProducts,
  fetchGenres,
  fetchSystems,
  sortProducts,
  writeGenreEntry,
  writeSystemEntry,
  writeSearchEntry,
  addToCart,
  updateCart
} from '../store';

const mapState = (state) => {
  return {
    cart: state.cart,
    products: state.products,
    searchEntry: state.searchEntry,
    selectedGenre: state.genreEntry,
    selectedSystem: state.systemEntry,
    genres: state.genres,
    systems: state.systems
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadData: () => {
      dispatch(fetchGenres());
      dispatch(fetchSystems());
      dispatch(fetchProducts());
    },
    handleAddProduct: (product) => {
      dispatch(addToCart(product, ownProps.history));
    },
    handleUpdateProduct: (orderId, productId, quantity) => {
      dispatch(updateCart(orderId, productId, quantity, ownProps.history));
    },
    sortProducts: (field, direction) => {
      dispatch(sortProducts(field, direction));
    },
    handleSearchChange: event => {
      dispatch(writeSearchEntry(event.target.value));
    },
    handleGenreChange: (event, { value }) => {
      dispatch(writeGenreEntry(value));
    },
    handleSystemChange: (event, { value }) => {
      dispatch(writeSystemEntry(value));
    }
  };
};

class BrowseProducts extends React.Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    // filters products based on sidebar input contents
    const selectedGenre = this.props.selectedGenre;
    const selectedSystem = this.props.selectedSystem;

    const products = this.props.products
      .filter(product => {
        return product.title.toLowerCase().match(this.props.searchEntry);
      })
      .filter(product => {
        if (selectedGenre && selectedSystem) {
          return product.genreId === selectedGenre && product.systemId === selectedSystem;
        }
        else if (selectedGenre) return product.genreId === selectedGenre;
        else if (selectedSystem) return product.systemId === selectedSystem;
        else return true;
      });


    return (
      <div className="browse-products-container">
        <SidebarFilter
          genres={this.props.genres}
          systems={this.props.systems}
          sortProducts={this.props.sortProducts}
          filterProducts={this.filterProducts}
          handleSearchChange={this.props.handleSearchChange}
          handleGenreChange={this.props.handleGenreChange}
          handleSystemChange={this.props.handleSystemChange}
        />
        <AllProducts
          products={products}
          cart={this.props.cart}
          handleAddProduct={this.props.handleAddProduct}
          handleUpdateProduct={this.props.handleUpdateProduct}
        />
      </div>
    );
  }
}

const BrowseProductsContainer = connect(mapState, mapDispatch)(BrowseProducts);

export default BrowseProductsContainer;
