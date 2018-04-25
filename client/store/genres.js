import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_GENRES = 'GET_GENRES';

/**
 * ACTION CREATORS
 */
export const getGenres = genres => ({ type: GET_GENRES, genres });

/**
 * THUNK CREATORS
 */
export const fetchGenres = () => dispatch =>
  axios
    .get('/api/genres')
    .then(res => dispatch(getGenres(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_GENRES:
      return action.genres;
    default:
      return state;
  }
}
