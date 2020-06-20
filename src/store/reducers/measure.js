import { 
    SET_MEASURE_COLUMN,
    CLEAR_MEASURE_COLUMN 
} from "../types/measure";

const INITIAL_STATE = {
    column: null
};
const measure = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_MEASURE_COLUMN:
            return {
                ...state,
                column: action.payload
            }
        case CLEAR_MEASURE_COLUMN:
            return {
                ...state,
                column: null
            }
        default:
            return state;
    }
};

export default measure;