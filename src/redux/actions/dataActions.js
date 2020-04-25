import {
  SET_OGLAS,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
} from "../actions/types";
import axios from "axios";

export const postaviOglase = (data, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  if (localStorage.getItem("FBIdToken")) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "FBIdToken"
    );
  }
  axios
    .post("/oglas", data)
    .then((res) => {
      console.log("GDESTE");
      dispatch({ type: SET_OGLAS, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/oglasSlika");
    })
    .catch((err) => {
      if (err.response.status == 403) {
        dispatch({ type: SET_UNAUTHENTICATED });
        alert("Token expired. Please login again!");
        history.push("/login");
      }
      console.log(`PUCACI DIVLJACI`);

      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const uploadImage = (formData, id, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(id);

  axios
    .post(`/oglas/image/${id}`, formData)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => console.log(err));
};

export const updateImage = (formData, id, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(id);

  axios
    .post(`/oglas/image/${id}`, formData)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => console.log(err));
};

export const updateOglase = (data, id, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/oglas/${id}`, data)
    .then((res) => {
      dispatch({ type: SET_OGLAS, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserOglasi = (handle) => (dispatch) => {};
