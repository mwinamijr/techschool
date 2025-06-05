import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
//import usersReducer from "../features/usersSlice";
//import notesReducer from "../features/notes/notesSlice";
//import examsReducer from "../features/exams/examsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
