import { CHANGE_LIVE_SESSION } from "../actions/actionTypes";

const initialState = null;
export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LIVE_SESSION:
      return action.payload;

    default:
      return state;
  }
}
