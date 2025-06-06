import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import usersReducer from "../features/userSlice";
//import notesReducer from "../features/notes/notesSlice";
//import examsReducer from "../features/exams/examsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    getUsers: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
