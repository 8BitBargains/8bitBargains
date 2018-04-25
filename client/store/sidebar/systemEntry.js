/**
 * ACTION TYPES
 */
const WRITE_SYSTEM_ENTRY = 'WRITE_SYSTEM_ENTRY';

/**
 * ACTION CREATORS
 */
export const writeSystemEntry = systemId => ({
  type: WRITE_SYSTEM_ENTRY,
  systemId
});

/**
 * REDUCER
 */
export default function(state = null, action) {
  switch (action.type) {
    case WRITE_SYSTEM_ENTRY:
      return action.systemId;
    default:
      return state;
  }
}
