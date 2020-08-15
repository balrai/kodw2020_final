import { CHANGE_LIVE_SESSION } from "./actionTypes";

export function changeLiveSession(value) {
  return {
    type: CHANGE_LIVE_SESSION,
    payload: value,
  };
}
