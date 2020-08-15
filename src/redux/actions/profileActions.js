import axios from "axios";

import {
  GET_PROFILE,
  GET_ERROR,
  PROFILE_LOADING,
  GET_PROFILES,
  LOADING,
} from "./actionTypes";

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .post("https://web.nova.hk/viewer/api/chat/v1/getChatProfile", {
      crossDomain: true,
    })
    .then(({ data }) => {
      if (data && data.userId) {
        //     window.addChatListener(onChatNotified);
        // window.addChatListener(onNewMessage);

        dispatch({ type: GET_PROFILE, payload: data });
      } else if (data && data.message === "no data") {
        dispatch({ type: GET_PROFILE, payload: null });
      }
    })

    .catch((err) => {
      console.log("error getting profile: ", err);
      dispatch({ type: GET_PROFILE, payload: null });
    });
};

// join Community
export const joinCommunity = (data) => (dispatch) => {
  const dataV = { ...data, crossDomain: true };

  axios
    .post("https://web.nova.hk/viewer/api/chat/v1/createChatProfile", dataV)
    .then((res) => {
      console.log("join community response: ", res);
      if (res.data && res.data.chatProfileItem) {
        dispatch({ type: GET_PROFILE, payload: res.data.chatProfileItem });
      }
    })
    .catch((err) => {
      console.log("Error joining community: ", err);
      dispatch({ type: GET_PROFILE, payload: null });
    });
};

// list profiles
export const loadMembers = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("https://web.nova.hk/viewer/api/chat/v1/listMembers", {
      crossDomain: true,
    })
    .then((res) => {
      console.log("members:", res);
      dispatch({ type: GET_PROFILES, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_PROFILES, payload: null });
    });
};

// loading
export const setLoading = () => {
  return {
    type: LOADING,
  };
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};
