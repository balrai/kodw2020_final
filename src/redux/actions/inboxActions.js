import { SET_RECIPIENT_ID, SET_RECIPIENT } from "./actionTypes";

export const setRecipientId = (id) => ({ type: SET_RECIPIENT_ID, payload: id });
export const setRecipient = (user) => ({
  type: SET_RECIPIENT,
  payload: user,
});
