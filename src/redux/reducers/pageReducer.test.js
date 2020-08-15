import * as actions from "../actions/pageActions";
import dateReducer from "./dateReducer";
import activeTabReducer from "./activeTabReducer";
import languageReducer from "./languageReducer";
import liveReducer from "./liveReducer";
import liveTabReducer from "./liveTabReducer";

describe("Page reducer should act as instructed", () => {
  const initialstate = {
    date: "AUG 26",
    activeTab: 1,
    liveTab: null,
    lang: "eng",
    live: {
      showLivePage: false,
      livePage: {},
    },
  };

  it("should change the date when passed CHANGE_DATE", () => {
    // arrange
    const newDate = "AUG 27";
    const action = actions.changeDate(newDate);

    //   act
    const newState = dateReducer(initialstate, action);

    console.log("new date: ", newState);

    // assert
    expect(newState).toEqual("AUG 27");
  });

  it("Should change tab when passed CHANGE_TAB", () => {
    //   arrange
    const newTab = 2;
    const action = actions.changeTab(newTab);

    // act
    const newState = activeTabReducer(initialstate, action);

    // assert
    expect(newState).toEqual(2);
  });

  it("Should update the tab text color depending on the live tab when passed UPDATE_TAB_TEXT", () => {
    //   arrange
    const liveTab = 3;
    const action = actions.updateTabText(liveTab);

    // act
    const newState = liveTabReducer(initialstate, action);

    // assert
    expect(newState).toEqual(3);
  });

  it("should change to live page when the 'live' and page info is passed with SHOW_PAGE", () => {
    //   arrange
    const page = { url: "playbackurl" };
    const name = "live";
    const action = actions.showPage(name, page);

    // act
    const newState = liveReducer(initialstate, action);

    // assert
    expect(newState.livePage.url).toEqual("playbackurl");
    expect(newState.showPage).toEqual("live");
  });

  it("should change the language of the page when passed CHANGE_PAGE_LANG", () => {
    //   arrange;
    const lang = "sc";
    const action = actions.changePageLanguage(lang);

    // act
    const newState = languageReducer(initialstate, action);

    // assert
    expect(newState).toEqual("sc");
  });
});
