import { createSlice } from '@reduxjs/toolkit';
import { getContentPageThunk } from './contentPageThunk';

const initialState = {
  contentPage: null,
};

const contentPageSlice = createSlice({
  name: 'contentPageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContentPageThunk.fulfilled, (state, action) => {
      state.contentPage = action.payload;
    });
  },
});

export const {} = contentPageSlice.actions;

export default contentPageSlice.reducer;
