import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from './userThunk';
import { userInfoLocal } from '../../service/lcoalService';
import { loginStatus } from '../../utils/constants';

const initialState = {
  keyLogin: userInfoLocal.get() ? userInfoLocal.get() : loginStatus.fail,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logoutAction: (state, action) => {
      state.keyLogin = loginStatus.fail;
      userInfoLocal.set(loginStatus.fail);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.keyLogin = action.payload;
      userInfoLocal.set(action.payload);
    });
  },
});

export const { logoutAction } = userSlice.actions;

export default userSlice.reducer;
