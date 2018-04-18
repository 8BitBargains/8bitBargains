import { connect } from 'react-redux';
import Browse from './Browse';
import { fetchGames } from '../store/games';

const mapState = (state) => {
  return {
    products: state.games
  }
}

// OB/KH: there's a "object" form of mapDispatchToProps
/*
const mapDispatch = {
  loadAllProducts: fetchGames
};
*/
const mapDispatch = (dispatch) => {
  return {
    loadAllProducts: () => {
      dispatch(fetchGames());
    }
  }
}

const BrowseContainer = connect(mapState, mapDispatch)(Browse);

export default BrowseContainer;
