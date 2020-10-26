import axios from "axios";
import * as actionTypes from "./actionTypes";

const getPostListStart = () => {
  return {
    type: actionTypes.GET_POSTS_LIST_START
  };
};

const getAPostListSuccess = posts => {
  return {
    type: actionTypes.GET_POSTS_LIST_SUCCESS,
    posts
  };
};

const getPostListFail = error => {
  return {
    type: actionTypes.GET_POSTS_LIST_FAIL,
    error: error
  };
};

export const getPosts = token => {
  return dispatch => {
    dispatch(getPostListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get("http://127.0.0.1:8000/assignments/")
      .then(res => {
        const assignments = res.data;
        dispatch(getPostListSuccess(posts));
      })
      .catch(err => {
        dispatch(getPostListFail());
      });
  };
};
