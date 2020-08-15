import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  SET_CURRENT_USER,
  GET_ERROR,
  HAS_UNREAD_MSG,
  SEEN_UNREAD_MSG,
} from "./actionTypes";

const eventId = "b8412917-ba17-42f2-9ef3-5142d81669a6";
// get current user
export const getInitialUserProfile = () => (dispatch) => {
  axios
    .get("https://web.nova.hk/viewer/api/user/v1/getInitialProfile", {
      withCredentials: true,
    })
    .then((res) => {
      console.log("RES: ", res);
      const token = res.data.initialProfile.lastIssuedAccessToken;
      console.log("token: ", token);
      localStorage.setItem("kodw2020Token", token);
      setAuthToken(token);
      dispatch(setCurrentUser(res.data.initialProfile));
      console.log("subscribing......,");
      window.subscribeChatNotification(eventId, res.data.initialProfile.userId);

      dispatch(checkUnreadMsg());
    })

    .catch((err) => {
      console.log("err: ", err);
      dispatch({
        type: GET_ERROR,
        payload: err,
      });
    });
};

// check unread msg after login
export const checkUnreadMsg = () => (dispatch) => {
  axios
    .post("https://web.nova.hk/viewer/api/chat/v1/hasUnreadMessage", {})
    .then((res) => {
      console.log("response of unread msg:", res.data);
      let hasUnreadMsg = res.data.hasUnreadMessage;

      dispatch({
        type: HAS_UNREAD_MSG,
        payload: hasUnreadMsg,
      });
    })
    .catch((err) => console.log("Error checking new msg"));
};

// new msg arrive
export function newMsgArrived() {
  return {
    type: HAS_UNREAD_MSG,
    payload: true,
  };
}

// seen unread msg
export function seenUnreadMsg() {
  return {
    type: SEEN_UNREAD_MSG,
    payload: false,
  };
}

// Set logged in user
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};
