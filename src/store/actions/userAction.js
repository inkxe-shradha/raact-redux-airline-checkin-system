import { getUserDetails } from "../../Api/authenticationService";
import { apiCallError } from "./apiStatusAction";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./storeActionTypes";

export const loadUserDetails = (userId) => {};

const loginUserSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

const logOutUserSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const signInUser = (user) => (dispatch) => {
  return getUserDetails(user.id)
    .then((pRes) => {
      let validState = false;
      if (
        (pRes.data.email === user.email &&
          pRes.data.password === user.password) ||
        user.googleAuth
      ) {
        dispatch(
          loginUserSuccess({
            ...pRes.data,
            name: user.googleAuth ? user.name : pRes.data.name,
          })
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...pRes.data,
            name: user.googleAuth ? user.name : pRes.data.name,
          })
        );
        validState = true;
      }
      return { ...pRes.data, validState };
    })
    .catch((error) => {
      dispatch(apiCallError(error));
    });
};

export const logOutApp = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logOutUserSuccess(null));
};
