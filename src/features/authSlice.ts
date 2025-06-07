import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl, getErrorMessage } from "../app/utils";

export interface UserInfo {
  id: number;
  email: string;
  token: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  role?: string;
  is_verified?: boolean;
  is_active?: boolean;
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
    first_name: string;
    middle_name?: string;
    last_name: string;
    username?: string;
    email: string;
    phone_number: string;
    password: string;
    gender: string;
    role: "student" | "teacher";
  },
  { rejectValue: string; state: { auth: AuthState } }
>(
  "auth/register",
  async (
    {
      first_name,
      middle_name,
      last_name,
      username,
      email,
      phone_number,
      password,
      gender,
      role,
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${djangoUrl}/api/users/register/`,
        {
          first_name,
          middle_name,
          last_name,
          username,
          email,
          phone_number,
          password,
          gender,
          role,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
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
