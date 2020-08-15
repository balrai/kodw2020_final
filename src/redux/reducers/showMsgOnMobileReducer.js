import { SHOW_MSGS } from "../actions/actionTypes";

const initialState = {
  showMsgs: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MSGS:
      return {
        showMsgs: action.payload,
      };
    default:
      return state;
  }
}
