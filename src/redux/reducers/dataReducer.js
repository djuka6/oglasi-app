import { SET_OGLAS } from "../actions/types";

const initialState = {
  item: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_OGLAS:
      return {
        item: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
