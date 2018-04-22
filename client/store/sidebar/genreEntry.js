/**
 * ACTION TYPES
 */
const WRITE_GENRE_ENTRY = 'WRITE_GENRE_ENTRY';

/**
 * ACTION CREATORS
 */
export const writeGenreEntry = genreId => ({ type: WRITE_GENRE_ENTRY, genreId });

/**
 * REDUCER
 */
export default function (state = null, action) {
  switch (action.type) {
    case WRITE_GENRE_ENTRY:
      return action.genreId;
    default:
      return state;
  }
}
