/**
 * ACTION TYPES
 */
const WRITE_SEARCH_ENTRY = 'WRITE_SEARCH_ENTRY';

/**
 * ACTION CREATORS
 */
export const writeSearchEntry = searchEntry => ({
  type: WRITE_SEARCH_ENTRY,
  searchEntry
});

/**
 * REDUCER
 */
export default function(state = '', action) {
  switch (action.type) {
    case WRITE_SEARCH_ENTRY:
      return action.searchEntry;
    default:
      return state;
  }
}
