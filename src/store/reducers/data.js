import { 
    GET_DATA_RESPONSE, 
    GET_DATA_ERROR 
} from "../types/data";

const INITIAL_STATE = {
    chart: null,
    error: null
};
const data = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_DATA_RESPONSE:
            return {
                ...state,
                chart: action.payload
            }
        case GET_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default data;