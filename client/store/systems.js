import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_SYSTEMS = 'GET_SYSTEMS';

/**
 * ACTION CREATORS
 */
const getSystems = systems => ({ type: GET_SYSTEMS, systems });

/**
 * THUNK CREATORS
 */
export const fetchSystems = () =>
  dispatch => (
    axios.get('/api/systems')
      .then(res =>
        dispatch(getSystems(res.data)))
      .catch(err => console.log(err))
  );

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_SYSTEMS:
      return action.systems;
    default:
      return state;
  }
}
