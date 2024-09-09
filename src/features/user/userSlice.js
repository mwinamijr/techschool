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
  users: [],
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
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerStudent.fulfilled, (state, { payload }) => {
        const user = payload;
        state.loading = false;
        state.user = user;
      })
      .addCase(registerStudent.rejected, (state, { payload }) => {
        const error = payload;
        state.error = error;
      })
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(listUsers.fulfilled, (state, { payload }) => {
        const users = payload;
        state.loading = false;
        state.users = users;
      })
      .addCase(listUsers.rejected, (state, { payload }) => {
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

export const registerStudent = createAsyncThunk(
  "student/register",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/students/`,
        user,
        config
      );
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const listUsers = createAsyncThunk("usersList", async () => {
  const user = getUserFromLocalStorage();
  try {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`${baseUrl}/api/users/`, config);
    return data;
  } catch (error) {
    return error.message;
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
