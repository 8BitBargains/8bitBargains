import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GAMES = 'GET_GAMES'

/**
 * ACTION CREATORS
 */
const getGames = games => ({ type: GET_GAMES, games })

/**
 * THUNK CREATORS
 */
export const fetchGames = () =>
  dispatch =>
    axios.get('/api/games')
      .then(res =>
        dispatch(getGames(res.data)))
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_GAMES:
      return action.games
    default:
      return state
  }
}
