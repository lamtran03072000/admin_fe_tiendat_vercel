import { createAsyncThunk } from '@reduxjs/toolkit';
import { contentService } from '../../service/contentService';

export const getContentPageThunk = createAsyncThunk(
  'users/fetchByIdStatus',
  async (payload, { dispatch, rejectWithValue }) => {
    const response = await contentService.getContentFull();
    return response.data;
  },
);
