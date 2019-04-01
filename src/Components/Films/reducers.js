import { CHANGE_FILTER } from "./constants.js";

const initialStateFilms = {
  filter: {}
};

export const filmsReducer = (state = initialStateFilms, action = {}) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
