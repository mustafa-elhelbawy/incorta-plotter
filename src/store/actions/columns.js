import { 
    GET_COLUMNS_REQUEST, 
    GET_COLUMNS_RESPONSE, 
    GET_COLUMNS_ERROR 
} from "../types/columns";

export const getColumnsRequest = () => ({
    type: GET_COLUMNS_REQUEST,
});

export const getColumnsResponse = (data) => ({
    type: GET_COLUMNS_RESPONSE,
    data
});

export const getColumnsError = (data) => ({
    type: GET_COLUMNS_ERROR,
    data
});
