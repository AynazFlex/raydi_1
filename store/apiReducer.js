import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";

const post = (fun) => async (data, thunkAPI) => {
  try {
    return await fun(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

const get = (fun) => async(_, thunkAPI) => {
  try {
    return await fun();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
}

export const registration = createAsyncThunk(
  "auth/registration",
  post(API.registration)
);

export const login = createAsyncThunk("auth/login", post(API.login));

export const recovery = createAsyncThunk(
  "auth/recovery",
  post(API.recovery)
);

export const resetPassword = createAsyncThunk(
  "auth/password-reset",
  post(API.reset)
);

export const updatePassword = createAsyncThunk(
  "settings/update",
  post(API.update)
);

export const createOrders = createAsyncThunk(
  "orders/create",
  post(API.ordersCreate)
);

export const checkoutOrders = createAsyncThunk(
  "orders/checkout",
  post(API.ordersCheckout)
);

export const getOrdersHistory = createAsyncThunk(
  "orders/history",
  get(API.ordersHistory)
);

export const balanceTopUp = createAsyncThunk(
  "balance/top-up",
  post(API.balanceTopUp)
)

const initialState = {
  sign: "",
  url: "",
  error: "",
  msg: "",
  isPending: false,
  success: false,
  order: {
    id: "",
    icon: "",
    plan: "",
    price: "",
    type: "",
    url: "",
  },
  orders: []
};

const fulfilled = (state, { payload }) => {
  state.msg = payload.msg || '';
  state.isPending = false;
  state.success = payload.success;
};

const fulfilledAuth = (state, { payload }) => {
  fulfilled(state, { payload });
  state.url = payload.url;
};

const pending = (state) => {
  state.error = "";
  state.isPending = true;
  state.success = false;
  state.msg = "";
  state.url = "";
};

const rejected = (state, { payload }) => {
  state.error = payload.msg || payload;
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
    [registration.fulfilled.type]: fulfilledAuth,
    [registration.pending.type]: pending,
    [registration.rejected.type]: rejected,
    //login
    [login.fulfilled.type]: fulfilledAuth,
    [login.pending.type]: pending,
    [login.rejected.type]: rejected,
    //recovery
    [recovery.fulfilled.type]: (state, { payload }) => {
      fulfilled(state, { payload });
      state.sign = payload.sign;
    },
    [recovery.pending.type]: (state) => {
      pending(state);
      state.sign = "";
    },
    [recovery.rejected.type]: rejected,
    //reset-password
    [resetPassword.fulfilled.type]: fulfilled,
    [resetPassword.pending.type]: pending,
    [resetPassword.rejected.type]: rejected,
    //update-password
    [updatePassword.fulfilled.type]: fulfilled,
    [updatePassword.pending.type]: pending,
    [updatePassword.rejected.type]: rejected,
    //create orders
    [createOrders.fulfilled.type]: (state, { payload }) => {
      fulfilled(state, { payload });
      state.order = payload.order
    },
    [createOrders.pending.type]: (state) => {
      pending(state);
      state.order = initialState.order
    },
    [createOrders.rejected.type]: (state, { payload }) => {
      rejected(state, { payload });
      state.order = payload.order
    },
    //checkout orders
    [checkoutOrders.fulfilled.type]: (state, { payload }) => {
      fulfilled(state, { payload });
      state.url = payload.url;
    },
    [checkoutOrders.pending.type]: pending,
    [checkoutOrders.rejected.type]: rejected,
    //orders history
    [getOrdersHistory.fulfilled.type]: (state, { payload }) => {
      state.orders.concat(payload.orders)
      state.success = payload.success
      state.isPending = false
    },
    [getOrdersHistory.pending.type]: (state) => {
      state.isPending = true
      state.error = ""
    },
    [getOrdersHistory.rejected.type]: rejected,
    //balance top-up
    [balanceTopUp.fulfilled.type]: (state, { payload }) => {
      fulfilled(state, { payload });
      state.url = payload.url;
    },
    [balanceTopUp.pending.type]: pending,
    [balanceTopUp.rejected.type]: rejected,
  },
});

const { reducer, actions } = apiReducer;

export const { reset } = actions;

export default reducer;
