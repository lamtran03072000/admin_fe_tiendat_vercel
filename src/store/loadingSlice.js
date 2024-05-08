import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    turnOnLoading: (state, action) => {
      state.isLoading = true;
    },
    turnOffLoading: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { turnOffLoading, turnOnLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
