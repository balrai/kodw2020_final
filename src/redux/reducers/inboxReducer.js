import { SET_RECIPIENT_ID, SET_RECIPIENT } from "../actions/actionTypes";

const initialState = {
  recipientId: null,
  recipient: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RECIPIENT_ID:
      return {
        ...state,
        recipientId: action.payload,
      };
    case SET_RECIPIENT:
      return {
        ...state,
        recipient: action.payload,
      };
    default:
      return state;
  }
}
