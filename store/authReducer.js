import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";

export const registration = createAsyncThunk(
  "auth/registration",
  async (data, thunkAPI) => {
    try {
      const result = await API.registration(data);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const result = await API.login(data);
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  url: "",
  error: "",
  msg: "",
  isPending: false,
  success: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset(state) {
      state.url = "";
      state.error = "";
      state.msg = "";
      state.isPending = false;
      state.success = false;
    },
  },
  extraReducers: {
    //registration
    [registration.fulfilled.type]: (state, { payload }) => {
      state.url = payload.url;
      state.error = "";
      state.msg = payload.msg;
      state.isPending = false;
      state.success = payload.success;
    },
    [registration.pending.type]: (state) => {
      state.error = "";
      state.isPending = true;
      state.success = false;
      state.msg = "";
      state.url = "";
    },
    [registration.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.isPending = false;
    },
    //login
    [login.fulfilled.type]: (state, { payload }) => {
      state.url = payload.url;
      state.error = "";
      state.msg = payload.msg;
      state.isPending = false;
      state.success = payload.success;
    },
    [login.pending.type]: (state) => {
      state.error = "";
      state.isPending = true;
      state.success = false;
      state.msg = "";
      state.url = "";
    },
    [login.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.isPending = false;
    },
  },
});

const { reducer, actions } = authReducer;

export const { reset } = actions;

export default reducer;
