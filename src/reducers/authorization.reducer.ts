import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _firebase from 'firebase/app';

import loginWithNodemyApi, { LoginWithNodemyBody } from '../apis/loginWithNodemy.api';
import localStorageKeys from '../configs/localStorageKeys.config';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import { setAccessToken } from './authentication.reducer';
import firebase from '../configs/firebase.config';
import loginWithGoogleApi from '../apis/loginWithGoogle.api';
import getAccessTokenApi from '../apis/getAccessToken.api';
import logoutApi from '../apis/logout.api';
import { clearUserProfile } from './account.reducer';
import { resetCourse } from './course.reducer';
import { clearListCourses } from './listCourses.reducer';
import { resetRatingState } from './rating.reducer';
import { clearListRatings } from './ratings.reducer';

const initialState = {
  refreshToken: '',
  error: '',
  isAuthorizing: true,
};

const authorizationSlice = createSlice({
  name: 'authorizationReducer',
  initialState,
  reducers: {
    setIsAuthorizing(state) {
      state.isAuthorizing = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
      state.error = '';
      state.isAuthorizing = false;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.refreshToken = '';
      state.isAuthorizing = false;
      localStorage.clear();
    }
  },
});

export const {
  loginSuccess,
  loginFailed
} = authorizationSlice.actions;

export const loginWithNodemy = (credentials: LoginWithNodemyBody): AppThunk => async (dispatch) => {
  const response = await loginWithNodemyApi(credentials);
  if (isResponseError(response)) {
    return dispatch(loginFailed(response.error));
  }

  localStorage.setItem(localStorageKeys.refreshToken, response.data.refreshToken);
  localStorage.setItem(localStorageKeys.accessToken, response.data.accessToken);
  
  dispatch(setAccessToken(response.data.accessToken));
  dispatch(loginSuccess(response.data.refreshToken));
};

export const loginWithGoogle = (): AppThunk => async (dispatch) => {
  const provider = new _firebase.default.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    'login_hint': 'user@example.com',
  });

  try {
    const googleResponse = await firebase.auth().signInWithPopup(provider);
    const credential = googleResponse.credential as _firebase.default.auth.OAuthCredential;
    const accessToken = credential.accessToken;
    const response = await loginWithGoogleApi({ googleAccessToken: accessToken });
    if (isResponseError(response)) {
      return dispatch(loginFailed(response.error));
    }

    localStorage.setItem(localStorageKeys.refreshToken, response.data.refreshToken);
    localStorage.setItem(localStorageKeys.accessToken, response.data.accessToken);
    
    dispatch(setAccessToken(response.data.accessToken));
    dispatch(loginSuccess(response.data.refreshToken));
  }
  catch (error) {
    dispatch(loginFailed(error.message));
  }
};

export const getAccessToken = (): AppThunk => async (dispatch) => {
  const refreshToken = localStorage.getItem(localStorageKeys.refreshToken);
  if (!refreshToken || refreshToken === "") {
    dispatch(loginFailed(''));
    dispatch(setAccessToken(''));
    return localStorage.clear();
  }
  const response = await getAccessTokenApi(refreshToken);
  if (isResponseError(response)) {
    dispatch(loginFailed(''));
    dispatch(setAccessToken(''));
    return localStorage.clear();
  }

  localStorage.setItem(localStorageKeys.accessToken, response.data.accessToken);
  dispatch(setAccessToken(response.data.accessToken));
  dispatch(loginSuccess(refreshToken));
};

export const logout = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authorizationReducer } = state;
  await logoutApi(authorizationReducer.refreshToken);
  dispatch(loginFailed(''));
  dispatch(setAccessToken(''));
  dispatch(clearUserProfile());
  dispatch(resetCourse());
  dispatch(clearListCourses());
  dispatch(resetRatingState());
  dispatch(clearListRatings());
};

export default authorizationSlice.reducer;