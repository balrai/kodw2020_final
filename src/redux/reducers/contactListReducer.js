import {
  GET_CONTACT_LIST,
  GET_CONTACT_LIST_LOADING,
} from "../actions/actionTypes";

const initialState = {
  contacts: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTACT_LIST:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case GET_CONTACT_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
