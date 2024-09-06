import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";

const baseUrl = "http://127.0.0.1:8000";

const initialState = {
  loading: false,
  error: null,
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.loading = false;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        const error = payload;
        console.log(error);
        state.error = error;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.loading = false;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        const error = payload;
        state.error = error;
      });
  },
});

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/login/`,
        user,
        config
      );
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(`${baseUrl}/api/users/`, user, config);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
