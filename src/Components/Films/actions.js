import {
    CHANGE_FILTER
} from "./constants.js";

export const changeFilter = (filter) => ({
    type: CHANGE_FILTER,
    payload: filter
});

