import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";

export const registration = createAsyncThunk(
  "auth/registration",
  async (data, thunkAPI) => {
    try {
      const result = await API.registration(data);
      return result;
    } catch (error) {
      if (response?.status === 400)
        return thunkAPI.rejectWithValue(`${response?.data.detail}`);
      if (response?.status === 422)
        return thunkAPI.rejectWithValue("Validation error");
      return thunkAPI.rejectWithValue(`error status ${response?.status}`);
    }
  }
);

const initialState = {
    url: '',
    error: "",
    msg: "",
    isPending: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    //registration
    [registration.fulfilled.type]: (state, { payload }) => {
        console.log(payload)
      state.url = payload.url;
      state.error = "";
      state.msg = payload.msg
      state.isPending = false;
    },
    [registration.pending.type]: (state) => {
      state.isPending = true;
    },
    [registration.rejected.type]: (state, { payload }) => {
        console.log(payload)
      state.error = payload?.msg || 'error';
      state.isPending = false;
    },
  },
});

const { reducer } = authReducer;

export default reducer
