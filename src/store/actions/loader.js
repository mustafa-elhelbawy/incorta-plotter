import { SET_LOADER } from "../types";

export const loader = (payload) => ({
    type: SET_LOADER,
    payload
});