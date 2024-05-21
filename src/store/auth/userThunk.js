import { createAsyncThunk } from '@reduxjs/toolkit';
import { contentService } from '../../service/contentService';
import { userService } from '../../service/user/userSer';
import { message } from 'antd';
import { loginStatus } from '../../utils/constants';

export const loginThunk = createAsyncThunk(
  'users/login',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const dataLogin = await userService.postLogin(user);
      if (dataLogin.data.privateLogin == loginStatus.success) {
        message.success('đăng nhập thành công');
        return dataLogin.data.privateLogin;
      } else if (dataLogin.data.privateLogin == loginStatus.fail) {
        message.error('Tài khoản hoặc mật khẩu sai');
      }
    } catch (error) {
      return 'Thất bại login thunk';
    }
  },
);
