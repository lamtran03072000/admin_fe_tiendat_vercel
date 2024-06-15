import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dsSpMoTaAdd: [{ id: 1, base64: '', des: '', preview: '' }],

  formAdd: { id: 1, base64: '', des: '', preview: '' },
  isUpdate: false,
  isPressButton: 1,
};

const sanPhamSlice = createSlice({
  name: 'sanPhamSlice',
  initialState,
  reducers: {
    handdleAddSpMoTa: (state, { payload }) => {
      state.dsSpMoTaAdd.push(payload);
      state.isUpdate = false;
    },
    handdleRemoveSpMoTa: (state, { payload }) => {
      state.dsSpMoTaAdd = state.dsSpMoTaAdd.filter(
        (item, i) => item.id !== payload,
      );
    },
    handleShowSpMoTa: (state, { payload }) => {
      state.formAdd = payload;
      state.isUpdate = true;
      state.isPressButton = Date.now();
    },
    handleClearForm: (state, { payload }) => {
      state.formAdd = {};
      state.dsSpMoTaAdd = [];
      state.isUpdate = false;
    },
    handleUpdateForm: (state, { payload }) => {
      let index = state.dsSpMoTaAdd.findIndex((item) => item.id == payload.id);
      console.log('index: ', index);

      if (index != -1) {
        state.dsSpMoTaAdd[index] = payload;
        state.isUpdate = false;
      }
    },
  },
});

export const {
  handdleAddSpMoTa,
  handdleRemoveSpMoTa,
  handleShowSpMoTa,
  handleClearForm,
  handleUpdateForm,
} = sanPhamSlice.actions;

export default sanPhamSlice.reducer;
