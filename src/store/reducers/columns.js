import { 
    GET_COLUMNS_RESPONSE, 
    GET_COLUMNS_ERROR 
} from "../types/columns";

const INITIAL_STATE = {
    list: [],
    error: null
};
const columns = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_COLUMNS_RESPONSE:
            return {
                ...state,
                list: action.payload
            }
        case GET_COLUMNS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default columns;