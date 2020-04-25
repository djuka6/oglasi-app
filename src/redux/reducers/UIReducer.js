import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../actions/types";

const initialState = {
  errors: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        initialState,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        loading: false,
      };
  }
}
