import { combineReducers } from '@reduxjs/toolkit';
import contentPageSlice from './contentPage/contentPageSlice';

export const rootReducer = combineReducers({
  contentPageSlice,
});
