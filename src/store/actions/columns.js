import { 
    GET_COLUMNS_REQUEST, 
    GET_COLUMNS_RESPONSE, 
    GET_COLUMNS_ERROR 
} from "../types/columns";

export const getColumnsRequest = () => ({
    type: GET_COLUMNS_REQUEST,
});

export const getColumnsResponse = (payload) => ({
    type: GET_COLUMNS_RESPONSE,
    payload
});

export const getColumnsError = (payload) => ({
    type: GET_COLUMNS_ERROR,
    payload
});
