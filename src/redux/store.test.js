import { createStore } from "redux";
import rootReducer from "./reducers";
import * as pageActions from "./actions/pageActions";
import initialState from "./reducers/initialState";

describe("Store", () => {
  const store = createStore(rootReducer, initialState);

  it("Should handle change date", () => {
    // arrange
    const date = "AUG 29";

    // act
    const action = pageActions.changeDate(date);
    store.dispatch(action);

    // assert
    const newDate = store.getState().date;

    expect(newDate).toEqual("AUG 29");
  });

  it("Should handle change language", () => {
    // arrange
    const lang = "sc";

    // act
    const action = pageActions.changePageLanguage(lang);
    store.dispatch(action);

    // assert
    const newState = store.getState();
    const newLang = newState.lang;

    expect(newLang).toEqual("sc");
  });

  it("Should handle change active Tab", () => {
    // arrange
    const tab = 2;

    // act

    const action = pageActions.changeTab(tab);
    store.dispatch(action);

    // assert
    const newState = store.getState();
    const activeTab = newState.activeTab;

    expect(activeTab).toEqual(2);
  });
  it("Should handle show Live Page", () => {
    // arrange
    const live = {
      url: "playbackurl",
      data: "sample data",
    };

    // act

    const action = pageActions.showPage("live", live);
    store.dispatch(action);

    // assert
    const newState = store.getState();
    const url = newState.live.livePage.url;

    expect(url).toEqual("playbackurl");
  });

  

  it("Should handle show live tab behaviour", () => {
    // arrange
    const tab = 3;
    // act

    const action = pageActions.updateTabText(tab);
    store.dispatch(action);

    // assert
    const newState = store.getState();
    console.log("STATE: ", newState);
    const liveTab = newState.liveTab;

    expect(liveTab).toEqual(3);
  });

  it("should toggle language selection menu", () => {
    // arrange
    const val = true;
    // act
    const action = pageActions.toggleLanguage(val);
    store.dispatch(action);
    // assert
    const newState = store.getState();
    const newValue = newState.toggleLang;

    expect(newValue).toEqual(val);
  })
});
