import * as types from "./actionTypes";
import * as pageActions from "./pageActions";

describe("Change date", () => {
  it("should change the date", () => {
    // arrange
    const date = "AUG 26";
    const expectedAction = {
      type: types.CHANGE_DATE,
      payload: date,
    };

    // act
    const action = pageActions.changeDate(date);

    // assert
    expect(action).toEqual(expectedAction);
  });
});
