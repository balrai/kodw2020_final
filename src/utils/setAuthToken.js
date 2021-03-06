import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    console.log("setAuthToken: ", token);
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
