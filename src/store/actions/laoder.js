import { SHOW_LOADER, HIDE_LOADER } from "../types";

export const loader = (data) => ({
    type: data? SHOW_LOADER : HIDE_LOADER,
    data
});