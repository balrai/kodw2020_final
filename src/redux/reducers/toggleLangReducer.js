import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function toggleLang(state = initialState.toggleLang, action) {
    console.log("action.type: ",action.type)
  switch (action.type) {
    case types.TOGGLE_LANGUAGE_BOX:
        console.log("inside reducer: ",action.payload)
      return action.payload;

    default:
      return state;
  }
}
