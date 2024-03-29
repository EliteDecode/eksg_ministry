import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";

const students = JSON.parse(localStorage.getItem("Adminstudents"));
const eksg_subjects = JSON.parse(localStorage.getItem("eksg_subjects"));

const initialState = {
  students: students ? students : [],
  singleStudents: null,
  subjects: eksg_subjects ? eksg_subjects : [],
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

export const registerStudent = createAsyncThunk(
  "students/registerStudent",
  async (studentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().schoolAuth.user.token;
      const data = await studentService.registerStudent(token, studentData);
      console.log(data);
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

export const updateSingleStudent = createAsyncThunk(
  "students/updateSingleStudent",
  async (studentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().schoolAuth.user.token;
      const data = await studentService.updateSingleStudents(
        token,
        studentData
      );
      console.log(data);
      return data.student;
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

export const getAllSubjects = createAsyncThunk(
  "students/getAllSubjects",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().schoolAuth.user.token;
      const data = await studentService.getAllSubjects(token);
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
      .addCase(updateSingleStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.singleStudent = action.payload;
        state.isSuccess = true;
        state.message = "student added successfully";
      })
      .addCase(updateSingleStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(registerStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "student added successfully";
      })
      .addCase(registerStudent.rejected, (state, action) => {
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
      })
      .addCase(getAllSubjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.subjects = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = studentsSlice.actions;
export default studentsSlice.reducer;
