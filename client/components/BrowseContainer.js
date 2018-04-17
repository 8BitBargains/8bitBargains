import { connect } from 'react-redux';
import Browse from './Browse';
import { fetchGames } from '../store/games';

const mapState = (state) => {
  return {
    products: state.games
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadAllProducts: () => {
      dispatch(fetchGames());
    }
  }
}

const BrowseContainer = connect(mapState, mapDispatch)(Browse);

export default BrowseContainer;
