import { 
    GET_DATA_REQUEST, 
    GET_DATA_RESPONSE, 
    GET_DATA_ERROR 
} from "../types/data";

export const getDataRequest = (payload) => ({
    type: GET_DATA_REQUEST,
    payload
});

export const getDataResponse = (payload) => ({
    type: GET_DATA_RESPONSE,
    payload
});

export const getDataError = (payload) => ({
    type: GET_DATA_ERROR,
    payload
});
