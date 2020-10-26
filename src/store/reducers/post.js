import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  posts: [],
  error: null,
  loading: false
};

const getPostListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getPostListSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.posts,
    error: null,
    loading: false
  });
};

const getPostListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_POSTS_LIST_START:
        return getPostListStart(state, action);
      case actionTypes.GET_POSTS_LIST_SUCCESS:
        return getPostListSuccess(state, action);
      case actionTypes.GET_POSTS_LIST_START:
        return getPostListFail(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;