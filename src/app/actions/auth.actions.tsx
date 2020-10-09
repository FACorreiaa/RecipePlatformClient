import UserInterface from "../model/user.interface";
//Set loggedin user
import { SET_CURRENT_USER, SET_NEW_USER } from "../types/auth.type";

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
