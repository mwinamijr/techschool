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
  userDetails: [],
  updateSuccess: false,
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
        state.error = error;
        state.loading = false;
      })
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerStudent.fulfilled, (state, { payload }) => {
        const user = payload;
        state.loading = false;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(registerStudent.rejected, (state, { payload }) => {
        const error = payload;
        state.error = error;
        state.loading = false;
      })
      .addCase(registerTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerTeacher.fulfilled, (state, { payload }) => {
        const user = payload;
        state.loading = false;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(registerTeacher.rejected, (state, { payload }) => {
        const error = payload;
        state.error = error;
        state.loading = false;
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
        state.loading = false;
        state.error = error;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        const user = payload;
        state.loading = false;
        state.userDetails = user;
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        const error = payload;
        state.loading = false;
        state.error = error;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        const user = payload;
        state.loading = false;
        state.updateSuccess = true;
        state.users = user;
        addUserToLocalStorage(user);
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        const error = payload;
        state.loading = false;
        state.error = error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        const error = payload;
        state.loading = false;
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
      if (!error.response.data.detail) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue(error.response.data.detail);
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
        `${baseUrl}/api/users/register/`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response.data.detail) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const registerTeacher = createAsyncThunk(
  "teacher/register",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/register/`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response.data.detail) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const listUsers = createAsyncThunk("usersList", async (_, thunkAPI) => {
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
    if (!error.response.data.detail) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return thunkAPI.rejectWithValue(error.response.data.detail);
  }
});

export const getUserDetails = createAsyncThunk(
  "userDetails",
  async (id, thunkAPI) => {
    const user = getUserFromLocalStorage();
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${baseUrl}/api/users/${id}/`, config);

      return data;
    } catch (error) {
      if (!error.response.data.detail) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (user, thunkAPI) => {
    const userInfo = getUserFromLocalStorage();
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/users/profile/update/`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response.data.detail) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, thunkAPI) => {
    const userInfo = getUserFromLocalStorage();
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `${baseUrl}/api/users/delete/${id}/`,
        config
      );
      return data;
    } catch (error) {
      if (!error.response.data.detail) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
