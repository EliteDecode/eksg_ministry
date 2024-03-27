import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import schoolSlice from "@/features/schools/schoolSlice";
import studentSlice from "@/features/students/studentSlice";
export const store = configureStore({
  reducer: {
    adminAuth: authReducer,
    Adminschools: schoolSlice,
    Adminstudents: studentSlice,
  },
});
