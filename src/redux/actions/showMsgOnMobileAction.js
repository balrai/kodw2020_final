import { SHOW_MSGS } from "./actionTypes";

export function hideContacts() {
  console.log("hide contacts");
  return {
    type: SHOW_MSGS,
    payload: true,
  };
}

export function showContacts() {
  console.log("show contacts");
  return {
    type: SHOW_MSGS,
    payload: false,
  };
}
