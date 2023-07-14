import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  login: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: state,

  reducers: {
  }
});

export const authReducer = authSlice.reducer;