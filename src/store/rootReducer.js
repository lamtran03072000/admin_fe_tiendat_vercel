import { combineReducers } from '@reduxjs/toolkit';
import contentPageSlice from './contentPage/contentPageSlice';
import loadingSlice from './loadingSlice';

export const rootReducer = combineReducers({
  contentPageSlice,
  loadingSlice,
});
