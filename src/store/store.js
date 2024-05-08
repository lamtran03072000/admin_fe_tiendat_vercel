import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { getContentPageThunk } from './contentPage/contentPageThunk';
import { https } from '../service/urlconfig';
import { turnOffLoading, turnOnLoading } from './loadingSlice';

export const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(getContentPageThunk());

https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store.dispatch(turnOnLoading());

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch(turnOffLoading());

    return response;
  },
  function (error) {
    store.dispatch(turnOffLoading());

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
