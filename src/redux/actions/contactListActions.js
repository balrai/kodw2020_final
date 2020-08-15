import axios from "axios";

import { GET_CONTACT_LIST, GET_CONTACT_LIST_LOADING } from "./actionTypes";

export const loadContactList = () => (dispatch) => {
  setListLoading();
  axios
    .post("https://web.nova.hk/viewer/api/chat/v1/getMyChatList", {
      crossDomain: true,
    })
    .then((res) => {
      let chats = sortChatsByTime(res.data);
      dispatch({
        type: GET_CONTACT_LIST,
        payload: chats,
      });
    })
    .catch((err) => console.log("Error getting contacts:", err));
};

export function setListLoading() {
  return {
    type: GET_CONTACT_LIST_LOADING,
    payload: true,
  };
}

function sortChatsByTime(chats) {
  return chats.slice().sort(function (t1, t2) {
    return t2.lastMessage.sentAt - t1.lastMessage.sentAt;
  });
}
