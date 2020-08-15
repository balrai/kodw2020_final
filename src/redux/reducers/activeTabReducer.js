import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function activeTabReducer(
  state = initialState.activeTab,
  action
) {
  switch (action.type) {
    case types.CHANGE_TAB:
      return action.payload;

    default:
      return state;
  }
}
