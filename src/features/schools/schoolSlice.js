import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import schoolService from "./schoolService";

const schools = JSON.parse(localStorage.getItem("Adminschools"));
const regStatus = JSON.parse(localStorage.getItem("reg-status"));
const lgaAdminSchools = JSON.parse(localStorage.getItem("lgaAdminSchools"));

const initialState = {
  schools: schools ? schools : null,
  lgaSchools: lgaAdminSchools ? lgaAdminSchools : null,
  singleSchool: null,
  regStatus: regStatus ? regStatus : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

if (schools) {
  initialState.schools = schools;
}

export const getAllSchools = createAsyncThunk(
  "schools/getAllSchools",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await schoolService.getAllSchools(token);
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

export const getAllLGAsSchools = createAsyncThunk(
  "schools/getAllLGAsSchools",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await schoolService.getAllLGASchools(token);
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

export const getRegStatus = createAsyncThunk(
  "schools/getRegStatus",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await schoolService.getRegStatus(token);
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

export const getSingleSchool = createAsyncThunk(
  "schools/getSingleSchool",
  async (schoolId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await schoolService.getSingleSchool(token, schoolId);
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

export const addSchool = createAsyncThunk(
  "schools/addSchool",
  async (schoolData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await schoolService.addSchool(token, schoolData);
      console.log(data);
      return data.school;
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

export const closeRegisteration = createAsyncThunk(
  "schools/closeRegisteration",
  async (status, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await schoolService.closeRegisteration(token, status);
      return data.school;
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

export const updateSchool = createAsyncThunk(
  "schools/updateSchool",
  async (schoolData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.user.token;
      const data = await schoolService.updateSchool(token, schoolData);
      console.log(data);
      return data.school;
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

const schoolSlice = createSlice({
  name: "schools",
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
      .addCase(getAllSchools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSchools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.schools = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllSchools.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getAllLGAsSchools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLGAsSchools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.lgaSchools = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllLGAsSchools.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getRegStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.regStatus = action.payload;
        state.isSuccess = true;
      })
      .addCase(getRegStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSingleSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleSchool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.singleSchool = action.payload;
        state.isSuccess = true;
      })
      .addCase(getSingleSchool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.singleSchool = null;
        state.isSuccess = false;
      })
      .addCase(addSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSchool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.singleSchool = action.payload;
        state.isSuccess = true;
        state.message = "school added successfully";
      })
      .addCase(addSchool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.singleSchool = null;
        state.isSuccess = false;
      })
      .addCase(updateSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSchool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.singleSchool = action.payload;
        state.isSuccess = true;
        state.message = "school updated successfully";
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        state.isSuccess = false;
      })
      .addCase(closeRegisteration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeRegisteration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Registration status updated successfully";
      })
      .addCase(closeRegisteration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = schoolSlice.actions;
export default schoolSlice.reducer;
