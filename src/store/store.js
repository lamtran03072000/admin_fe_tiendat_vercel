import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { getContentPageThunk } from './contentPage/contentPageThunk';

export const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(getContentPageThunk());
