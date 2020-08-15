import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function liveTabReducer(state = initialState.liveTab, action) {
  switch (action.type) {
    case types.UPDATE_TAB_TEXT:
      return action.payload;

    default:
      return state;
  }
}
