import axios from "axios";
import setAuthToken from "../../config/SetAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, SET_NEW_USER } from "../types/auth.type";
import { Dispatch } from "redux";
import { history } from "../../config/History";

interface UserInterface {
  name: string;
  username: string;
  email: string;
  password: string;
}
//register
export const registerUser = (
  name: string,
  username: string,
  email: string,
  password: string
  //profileImage: string
) => async (dispatch: Dispatch) => {
  try {
    const result = await axios.post("http://localhost:3000/api/users/", {
      name,
      username,
      email,
      password,
    });
    dispatch(setNewuser({ name, username, email, password }));
    history.push("/login");
  } catch (error) {
    throw new error();
  }
};

//login
export const loginUser = (email: string, password: string, from: any) => async (
  dispatch: Dispatch
) => {
  try {
    const result = await axios.post("http://localhost:3000/api/users/login", {
      email,
      password,
    });
    const { access_token } = result.data;
    localStorage.setItem("JWT_TOKEN", access_token);
    //set token to auth header
    setAuthToken(access_token);

    //decode token to get user data
    const decoded = jwt_decode(access_token);

    //set current
    dispatch(setCurrentUser(decoded));
    history.push(from);
    console.log("from", from);
  } catch (error) {
    throw new error();
  }
};

//Set loggedin user
export const setCurrentUser = (decoded: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Set new user
export const setNewuser = (user: UserInterface) => {
  return {
    type: SET_NEW_USER,
    payload: user,
  };
};
//Log user out
export const logoutUser = () => (dispatch: Dispatch) => {
  //remove token from local storage
  localStorage.removeItem("access_token");

  //remove auth header for future requests
  setAuthToken("");

  //set current user to empty object, set isAuth to false
  dispatch(setCurrentUser(""));
};
