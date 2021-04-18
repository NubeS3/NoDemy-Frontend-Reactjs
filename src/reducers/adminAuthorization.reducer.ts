import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppThunk} from '../configs/store.config';
import {isResponseError} from '../types/ResponseError.type';
import loginAdminApi, {LoginAdminBody} from "../apis/loginAdmin.api";

const initialState = {
    adminToken: '',
    error: '',
    isAuthorizing: true,
};

const adminAuthorizationSlice = createSlice({
    name: 'authorizationReducer',
    initialState,
    reducers: {
        setIsAuthorizing(state) {
            state.isAuthorizing = true;
        },
        loginSuccess(state, action: PayloadAction<string>) {
            state.adminToken = action.payload;
            state.error = '';
            state.isAuthorizing = false;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.adminToken = '';
            state.isAuthorizing = false;
            localStorage.clear();
        }
    },
});

export const {
    loginSuccess,
    loginFailed
} = adminAuthorizationSlice.actions;

export const loginAdmin = (credentials: LoginAdminBody): AppThunk => async (dispatch) => {
    const response = await loginAdminApi(credentials);
    if (isResponseError(response)) {
        return dispatch(loginFailed(response.error));
    }

    dispatch(loginSuccess(response.data.accessToken));
};

export default adminAuthorizationSlice.reducer;