import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
};

const authenticationSlice = createSlice({
  name: 'authenticationReducer',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const {
  setAccessToken,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;