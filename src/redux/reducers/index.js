import { combineReducers } from "redux";
import date from "./dateReducer";
import activeTab from "./activeTabReducer";
import live from "./pageReducer";
import lang from "./languageReducer";
import toggleLang from "./toggleLangReducer";
import inbox from "./inboxReducer";
import showMsgs from "./showMsgOnMobileReducer";
import liveSession from "./liveSessionReducer";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import contactList from "./contactListReducer";

const rootReducer = combineReducers({
  date,
  activeTab,
  liveSession,
  lang,
  live,
  toggleLang,
  inbox,
  showMsgs,
  contactList,
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
