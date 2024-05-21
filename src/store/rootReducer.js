import { combineReducers } from '@reduxjs/toolkit';
import contentPageSlice from './contentPage/contentPageSlice';
import loadingSlice from './loadingSlice';
import userSlice from './auth/userSlice';

export const rootReducer = combineReducers({
  contentPageSlice,
  loadingSlice,
  userSlice,
});
