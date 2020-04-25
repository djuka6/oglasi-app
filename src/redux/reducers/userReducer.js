import { SET_USER, CLEAR_USER } from "../actions/types";

const initialState = {
  user: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        initialState,
      };
    default:
      return {
        ...state,
      };
  }
}
