import axios from "axios";

const setAuthToken = (access) => {
  if (access) {
    axios.defaults.headers.common["x-auth-token"] = access;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
