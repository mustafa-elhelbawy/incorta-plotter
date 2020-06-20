import { 
    SET_MEASURE_COLUMN,
    CLEAR_MEASURE_COLUMN 
} from "../types/measure";

export const setMeasure = (payload) => ({
    type: SET_MEASURE_COLUMN,
    payload
});

export const clearMeasure = () => ({
    type: CLEAR_MEASURE_COLUMN
});
