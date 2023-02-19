import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";

const thunkFun = (fun) => async (data, thunkAPI) => {
  try {
    const result = await fun(data);
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const registration = createAsyncThunk(
  "auth/registration",
  thunkFun(API.registration)
);

export const login = createAsyncThunk("auth/login", thunkFun(API.login));

export const recovery = createAsyncThunk(
  "auth/recovery",
  thunkFun(API.recovery)
);

export const resetPassword = createAsyncThunk(
  "auth/password-reset",
  thunkFun(API.reset)
);

export const updatePassword = createAsyncThunk(
  "settings/update",
  thunkFun(API.update)
)

const initialState = {
  sign: "",
  url: "",
  error: "",
  msg: "",
  isPending: false,
  success: false,
};

const fulfilled = (state, { payload }) => {
  state.url = payload.url;
  state.error = "";
  state.msg = payload.msg;
  state.isPending = false;
  state.success = payload.success;
};

const pending = (state) => {
  state.error = "";
  state.isPending = true;
  state.success = false;
  state.msg = "";
  state.url = "";
};

const rejected = (state, { payload }) => {
  state.error = payload;
  state.isPending = false;
};

const apiReducer = createSlice({
  name: "api",
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
    [registration.fulfilled.type]: fulfilled,
    [registration.pending.type]: pending,
    [registration.rejected.type]: rejected,
    //login
    [login.fulfilled.type]: fulfilled,
    [login.pending.type]: pending,
    [login.rejected.type]: rejected,
    //recovery
    [recovery.fulfilled.type]: (state, { payload }) => {
      state.sign = payload.sign;
      state.error = "";
      state.msg = payload.msg;
      state.isPending = false;
      state.success = payload.success;
    },
    [recovery.pending.type]: (state) => {
      state.error = "";
      state.isPending = true;
      state.success = false;
      state.msg = "";
    },
    [recovery.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.isPending = false;
      state.sign = "";
    },
    //reset-password
    [resetPassword.fulfilled.type]: (state, { payload }) => {
      state.error = "";
      state.msg = payload.msg;
      state.isPending = false;
      state.success = payload.success;
    },
    [resetPassword.pending.type]: (state) => {
      state.error = "";
      state.isPending = true;
      state.success = false;
      state.msg = "";
    },
    [resetPassword.rejected.type]: rejected,
    //update-password
    [updatePassword.fulfilled.type]: (state, { payload }) => {
      state.error = "";
      state.msg = payload.msg;
      state.isPending = false;
      state.success = payload.success;
    },
    [updatePassword.pending.type]: (state) => {
      state.error = "";
      state.isPending = true;
      state.success = false;
      state.msg = "";
    },
    [updatePassword.rejected.type]: rejected,
  },
});

const { reducer, actions } = apiReducer;

export const { reset } = actions;

export default reducer;
