import axios from "axios";

const setAuthToken = (token: string) => {
  if (token) {
    //apply token to request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
