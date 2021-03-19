import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAccountInfoApi from '../apis/getAccountInfo.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import User from '../types/User.type';
import { loginFailed } from './authorization.reducer';
import updateNodemyAccountApi, { UpdateNodemyAccountBody } from '../apis/updateAccountWithNodemy.api';
import updateGoogleAccountApi, { UpdateGoogleAccountBody } from '../apis/updateAccountWithGoogle.api';
import changeAccountAvatarApi from '../apis/changeAccountAvatar.api';

const initialState = {
  user: {
    _id: '',
    fullname: '',
    email: '',
    avatar: '',
    accountHost: '',
    accountType: '',
  },
  error: '',
};

const accountSlice = createSlice({
  name: 'accountReducer',
  initialState,
  reducers: {
    clearUserProfile(state) {
      state.user = initialState.user;
    },
    setUserProfile(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = '';
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  clearUserProfile,
  setUserProfile,
  setError
} = accountSlice.actions;

export const getUserProfile = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  const { accessToken } = authenticationReducer;
  if (!accessToken) {
    return dispatch(clearUserProfile());
  }

  const response = await getAccountInfoApi(accessToken);
  if (isResponseError(response)) {
    if (response.code === 401) {
      dispatch(clearUserProfile());
      return dispatch(loginFailed(''));
    }

    return dispatch(clearUserProfile());
  }

  dispatch(setUserProfile(response.data.user));
};

export const updateProfileWithNodemy = (credentials: UpdateNodemyAccountBody): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  const { accessToken } = authenticationReducer;
  if (!accessToken) {
    return;
  }

  const response = await updateNodemyAccountApi(credentials, accessToken);
  console.log(response);
  if (isResponseError(response)) {
    return dispatch(setError(response.error));
  }

  dispatch(setUserProfile(response.data.user));
}

export const updateProfileWithGoogle = (credentials: UpdateGoogleAccountBody): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  const { accessToken } = authenticationReducer;
  if (!accessToken) {
    return;
  }

  const response = await updateGoogleAccountApi(credentials, accessToken);

  if (isResponseError(response)) {
    return dispatch(setError(response.error));
  }

  dispatch(setUserProfile(response.data.user));
}

export const updateAccountAvatar = (credentials: FormData): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  const { accessToken } = authenticationReducer;
  if (!accessToken) {
    return;
  }

  const response = await changeAccountAvatarApi(credentials, accessToken);
  console.log(response)

  if (isResponseError(response)) {
    return dispatch(setError(response.error));
  }
  console.log(response.data.user)
  dispatch(setUserProfile(response.data.user.avatar));
}


export default accountSlice.reducer;