import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  SET_USER,
} from "./types";
import axios from "axios";

export const getUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);

      dispatch({ type: SET_AUTHENTICATED });
      let podaci;
      podaci = getUserData(userData.email, (podaci) => {
        console.log(podaci);
        dispatch({ type: SET_USER, payload: podaci });
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
      });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: SET_AUTHENTICATED });
      let uData = {};
      uData.handle = newUserData.handle;
      uData.email = newUserData.email;
      uData.createdAt = newUserData.createdAt;
      dispatch({ type: SET_USER, payload: uData });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

const getUserData = (email, callBackFunction) => {
  axios
    .get(`/user/${email}`)
    .then((res) => {
      callBackFunction(res.data.userData[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};
