import axios from "axios";
import setAuthToken from "../../config/SetAuthToken";
import jwt_decode from "jwt-decode";
import { Dispatch } from "redux";
import { history } from "../../config/History";
import { setCurrentUser, setNewuser } from "../actions/auth.actions";
import UserInterface from "../model/user.interface";
import { LOGOUT } from "../types/auth.type";
//register
export const registerUser = (
  data: UserInterface
  //profileImage: string
) => (dispatch: Dispatch) => {
  axios
    .post("http://localhost:3000/api/users/", data)
    .then(() => {
      history.push("/login");
      dispatch(setNewuser(data));
    })
    .catch((error) => {
      throw error;
    });
};

//login
export const loginUser = (data: UserInterface, from: any) => (
  dispatch: Dispatch
) => {
  axios
    .post("http://localhost:3000/api/users/login", data)
    .then((res) => {
      //Save to localstorage
      //Set token to localStorage

      const { access_token } = res.data;
      localStorage.setItem("JWT_TOKEN", access_token);

      //set token to auth header
      setAuthToken(access_token);

      //decode token to get user data
      const decoded = jwt_decode(access_token);

      //set current user
      dispatch(setCurrentUser(decoded));
      history.push(from);
    })
    .catch((error) => {
      throw error;
    });
};

//Log user out
export const logoutUser = () => () => {
  //remove token from local storage
  localStorage.removeItem("access_token");

  //remove auth header for future requests
  setAuthToken("");

  //set current user to empty object, set isAuth to false
  return { type: LOGOUT };
};
