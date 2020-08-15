import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function liveReducer(state = initialState.live, action) {
  switch (action.type) {
    case types.SHOW_PAGE:
      return {
        showPage: action.payload.showPage,
        livePage: action.payload.livePage,
      };

    default:
      return state;
  }
}
