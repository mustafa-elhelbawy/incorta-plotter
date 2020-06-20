import { 
    SET_DIMENSION_COLUMN,
    CLEAR_DIMENSION_COLUMN 
} from "../types/dimension";

const INITIAL_STATE = {
    column: null
};
const dimension = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_DIMENSION_COLUMN:
            return {
                ...state,
                column: action.payload
            }
        case CLEAR_DIMENSION_COLUMN:
            return {
                ...state,
                column: null
            }
        default:
            return state;
    }
};

export default dimension;