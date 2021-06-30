import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAllUsers from '../apis/getAllUsers.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import User from '../types/User.type';
import upgradeUserAPI from '../apis/upgradeUser.api';
import banUserAPI from '../apis/banUser.api';
import unbanUserAPI from '../apis/unbanUser.api';
import downgradeUserAPI from '../apis/downgradeUser.api';
import adminAuthorizationReducer from "./adminAuthorization.reducer";

const initialState = {
    users: Array<User>(),
};

const userSlice = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Array<User>>) {
      state.users = action.payload;
    },
    updateUser(state, action: PayloadAction<User>) {
      state.users = state.users.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        }
        return user;
      })
    }
  },
});

export const {
  setUsers,
  updateUser
} = userSlice.actions;

export const getUsersAndTeachers = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { adminAuthorizationReducer } = state;
    const { adminToken } = adminAuthorizationReducer;

    const response = await getAllUsers(adminToken);

    if (isResponseError(response)) {
        return dispatch(setUsers([]));
    }
    
    dispatch(setUsers(response.data.users.filter((user: User) => user.accountType !== 'Admin')));
};

export const upgradeUser = (userId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { adminAuthorizationReducer, usersReducer } = state;
  const { adminToken } = adminAuthorizationReducer;

  const response = await upgradeUserAPI(adminToken, userId);

  if (!isResponseError(response)) {
    const temp = usersReducer.users.filter(user => user._id === userId);
    const res: User = {
      ...temp[0],
      accountType: 'Teacher'
    }

    return dispatch(updateUser(res));
  }
}

export const downgradeUser = (userId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { adminAuthorizationReducer, usersReducer } = state;
  const { adminToken } = adminAuthorizationReducer;

  const response = await downgradeUserAPI(adminToken, userId);

  if (!isResponseError(response)) {
    const temp = usersReducer.users.filter(user => user._id === userId);
    const res: User = {
      ...temp[0],
      accountType: 'Student'
    }

    return dispatch(updateUser(res));
  }
}

export const banUser = (userId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { adminAuthorizationReducer, usersReducer } = state;
  const { adminToken } = adminAuthorizationReducer;

  const response = await banUserAPI(adminToken, userId);

  if (!isResponseError(response)) {
    const temp = usersReducer.users.filter(user => user._id === userId);
    const res: User = {
      ...temp[0],
      isBanned: true
    }

    return dispatch(updateUser(res));
  }
}

export const unbanUser = (userId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { adminAuthorizationReducer, usersReducer } = state;
  const { adminToken } = adminAuthorizationReducer;

  const response = await unbanUserAPI(adminToken, userId);

  if (!isResponseError(response)) {
    const temp = usersReducer.users.filter(user => user._id === userId);
    const res: User = {
      ...temp[0],
      isBanned: false
    }

    return dispatch(updateUser(res));
  }
}

export default userSlice.reducer;