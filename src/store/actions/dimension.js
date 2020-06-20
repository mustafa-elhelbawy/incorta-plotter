import { 
    SET_DIMENSION_COLUMN,
    CLEAR_DIMENSION_COLUMN 
} from "../types/dimension";

export const setDimension = (payload) => ({
    type: SET_DIMENSION_COLUMN,
    payload
});

export const clearDimension = () => ({
    type: CLEAR_DIMENSION_COLUMN
});
