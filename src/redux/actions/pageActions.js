import * as types from "./actionTypes";

export function changeDate(date) {
  return {
    type: types.CHANGE_DATE,
    payload: date,
  };
}
export function changeTab(tab) {
  return {
    type: types.CHANGE_TAB,
    payload: tab,
  };
}
export function updateTabText(tab) {
  return {
    type: types.UPDATE_TAB_TEXT,
    payload: tab,
  };
}
export function showPage(name, page) {
  return {
    type: types.SHOW_PAGE,
    payload: { showPage: name, livePage: page },
  };
}

export function changePageLanguage(lang) {
  return {
    type: types.CHANGE_PAGE_LANG,
    payload: lang,
  };
}

export function toggleLanguage(val){
  console.log("toggle lang", val)
  return {
    type: types.TOGGLE_LANGUAGE_BOX,
    payload: val
  }
}
