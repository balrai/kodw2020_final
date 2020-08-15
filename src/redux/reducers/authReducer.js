import isEmpty from "../../utils/validation";
import {
  SET_CURRENT_USER,
  HAS_UNREAD_MSG,
  SEEN_UNREAD_MSG,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  hasUnreadMsg: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case HAS_UNREAD_MSG:
      return {
        ...state,
        hasUnreadMsg: action.payload,
      };
    case SEEN_UNREAD_MSG:
      return {
        ...state,
        hasUnreadMsg: action.payload,
      };

    default:
      return state;
  }
}
