const INITIAL_STATE = false;
const loader = (state = INITIAL_STATE, action) => action.data || INITIAL_STATE;

export default loader;