import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl, getErrorMessage } from "../app/utils";

export interface UserInfo {
  id: number;
  email: string;
  token: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isAdmin?: boolean;
  role?: string;
}

interface AuthState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  loading: false,
  error: null,
};

// Login Thunk
export const login = createAsyncThunk<
  UserInfo,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: { "Content-type": "application/json" },
    };

    const { data } = await axios.post(
      `${djangoUrl}/api/users/login/`,
      { email, password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Register Thunk
export const register = createAsyncThunk<
  UserInfo,
  {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    isTeacher?: boolean;
    role?: string;
  },
  { rejectValue: string; state: { auth: AuthState } }
>(
  "auth/register",
  async (
    { firstName, lastName, email, phone, password, isTeacher },
    { rejectWithValue, getState }
  ) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.userInfo?.token}`,
        },
      };

      const { data } = await axios.post(
        `${djangoUrl}/api/users/users/`,
        {
          firstName,
          lastName,
          email,
          phone,
          password,
          isTeacher,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
