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
  profile: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  profile: null,
  loading: false,
  error: null,
};

// Async Thunks

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${djangoUrl}/api/users/`);
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
      const { data } = await axios.get(`${djangoUrl}/api/users/profile/`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

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
>("users/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${djangoUrl}/api/users/${id}/`);
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
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

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      .addCase(fetchUnverifiedTeachers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(approveTeacher.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx >= 0) state.users[idx] = action.payload;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx >= 0) state.users[idx] = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
