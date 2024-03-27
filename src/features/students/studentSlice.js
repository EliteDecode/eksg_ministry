import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";

const students = JSON.parse(localStorage.getItem("Adminstudents"));

const initialState = {
  students: students ? students : [],
  singleStudents: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

if (students) {
  initialState.students = students;
}

export const getAllStudents = createAsyncThunk(
  "students/getAllStudents",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.getAllStudents(token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleStudent = createAsyncThunk(
  "students/getSingleStudent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.getSingleStudent(token, id);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.students = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSingleStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.singleStudents = action.payload;
        state.isSuccess = true;
      })
      .addCase(getSingleStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = studentsSlice.actions;
export default studentsSlice.reducer;
