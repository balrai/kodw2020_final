import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function pageReducer(state = initialState.lang, action) {
  switch (action.type) {
    case types.CHANGE_PAGE_LANG:
      return action.payload;

    default:
      return state;
  }
}
