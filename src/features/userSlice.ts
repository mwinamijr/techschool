import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl, getErrorMessage } from "../app/utils";

export interface User {
  id: number;
  email: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  role?: string;
  is_verified?: boolean;
  is_active?: boolean;
}

interface UserState {
  users: User[];
  user: User | null;
  profile: User | null;
  loading: boolean;
  error: string | null;
  deleteLoading?: boolean;
  deleteError?: string | null;
  successDelete?: boolean;
}

const initialState: UserState = {
  users: [],
  user: null,
  profile: null,
  loading: false,
  error: null,
  deleteLoading: false,
  deleteError: null,
  successDelete: false,
};

// Async Thunks

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const {
        auth: { userInfo },
      } = getState() as { auth: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${djangoUrl}/api/users/`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchUserDetails = createAsyncThunk<User>(
  "users/fetchUser",
  async (id, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const {
        auth: { userInfo },
      } = getState() as { auth: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${djangoUrl}/api/users/${id}`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchProfile = createAsyncThunk<User>(
  "users/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const {
        auth: { userInfo },
      } = getState() as { auth: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/users/profile/`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateProfile = createAsyncThunk<
  User,
  { id: number; updates: Partial<User> },
  { rejectValue: string }
>("users/profileUpdate", async ({ updates }, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      auth: { userInfo },
    } = getState() as { auth: { userInfo: { token: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${djangoUrl}/api/users/profile/`,
      updates,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const fetchUnverifiedTeachers = createAsyncThunk<User[]>(
  "users/fetchUnverifiedTeachers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${djangoUrl}/api/users/teachers/unverified/`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const approveTeacher = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>("users/approveTeacher", async (teacherId, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      `${djangoUrl}/api/users/teachers/${teacherId}/approve/`
    );
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateUser = createAsyncThunk<
  User,
  { id: number; updates: Partial<User> },
  { rejectValue: string }
>("users/update", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${djangoUrl}/api/users/${id}/`, updates);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteUser = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("users/delete", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      auth: { userInfo },
    } = getState() as { auth: { userInfo: { token: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${djangoUrl}/api/users/${id}/`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Slice

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    clearSuccessDelete(state) {
      state.successDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUnverifiedTeachers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(approveTeacher.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx >= 0) state.users[idx] = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx >= 0) state.users[idx] = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.successDelete = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
        state.deleteLoading = false;
        state.successDelete = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload as string;
        state.successDelete = false;
      });
  },
});

export const { clearUserError, clearSuccessDelete } = userSlice.actions;
export default userSlice.reducer;
