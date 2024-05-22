import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";
import { logoutError } from "../auth/authService";

const students = JSON.parse(localStorage.getItem("Adminstudents"));
const eksg_subjects = JSON.parse(localStorage.getItem("eksg_subjects"));

const initialState = {
  students: [],
  singleStudents: null,
  subjects: eksg_subjects ? eksg_subjects : [],
  generalAnalysis: [],
  totalLgaSubjectAnalysis: [],
  singleLgaSubjectAnalysis: [],
  singleSchoolSubjectAnalysis: [],
  generalAnalysis: [],
  quotaAnalysis: [],
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
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTotalLgaSubjectAnalysis = createAsyncThunk(
  "students/getTotalLgaSubjectAnalysis",
  async (exam_type, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.getTotalLgaSubjectAnalysis(
        token,
        exam_type
      );
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGeneralAnalysis = createAsyncThunk(
  "students/getGeneralAnalysis",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.getGeneralAnalysis(token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleLgaSubjectAnalysis = createAsyncThunk(
  "students/getSingleLgaSubjectAnalysis",
  async (lgaId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.getSingleLgaSubjectAnalysis(
        token,
        lgaId
      );
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getQuotaAnalysis = createAsyncThunk(
  "students/getQuotaAnalysis",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.getQuotaAnalysis(token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleSchoolSubjectAnalysis = createAsyncThunk(
  "students/getSingleSchoolSubjectAnalysis",
  async (schoolId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.getSingleSchoolSubjectAnalysis(
        token,
        schoolId
      );
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSingleStudents = createAsyncThunk(
  "students/deleteSingleStudents",
  async (studentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.deleteSingleStudents(token, studentId);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
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
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerStudent = createAsyncThunk(
  "students/registerStudent",
  async (studentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
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
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSingleStudent = createAsyncThunk(
  "students/updateSingleStudent",
  async (studentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
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
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllSubjects = createAsyncThunk(
  "students/getAllSubjects",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await studentService.getAllSubjects(token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logoutError();
        window.location.href = "/login";
      }
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
      .addCase(getGeneralAnalysis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGeneralAnalysis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.generalAnalysis = action.payload;
        state.isSuccess = true;
      })
      .addCase(getGeneralAnalysis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getTotalLgaSubjectAnalysis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalLgaSubjectAnalysis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.totalLgaSubjectAnalysis = action.payload;
        state.isSuccess = true;
      })
      .addCase(getTotalLgaSubjectAnalysis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSingleLgaSubjectAnalysis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleLgaSubjectAnalysis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.singleLgaSubjectAnalysis = action.payload;
        state.isSuccess = true;
      })
      .addCase(getSingleLgaSubjectAnalysis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSingleSchoolSubjectAnalysis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleSchoolSubjectAnalysis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.singleSchoolSubjectAnalysis = action.payload;
        state.isSuccess = true;
      })
      .addCase(getSingleSchoolSubjectAnalysis.rejected, (state, action) => {
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
      })
      .addCase(deleteSingleStudents.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteSingleStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "deleted";
        state.isSuccess = true;
      })
      .addCase(deleteSingleStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getQuotaAnalysis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuotaAnalysis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.quotaAnalysis = action.payload;
        state.isSuccess = true;
      })
      .addCase(getQuotaAnalysis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = studentsSlice.actions;
export default studentsSlice.reducer;
