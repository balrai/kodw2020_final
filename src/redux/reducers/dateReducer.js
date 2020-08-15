import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function dateReducer(state = initialState.date, action) {
  switch (action.type) {
    case types.CHANGE_DATE:
      return action.payload;
    default:
      return state;
  }
}
