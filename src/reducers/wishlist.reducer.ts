import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getWishlistApi from '../apis/getWishlist.api';
import removeCourseFromWishlist from '../apis/removeCourseFromWishlist.api';
import { AppThunk } from '../configs/store.config';

import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  listCourses: Array<CourseBasicInfoProps>(),
  isFetchingListCourses: true,
};

const wishlistSlice = createSlice({
  name: 'wishlistReducer',
  initialState,
  reducers: {
    resetWishlistState(state) {
      state = {...initialState};
    },
    setWishlist(state, action: PayloadAction<Array<CourseBasicInfoProps>>) {
      state.listCourses = action.payload;
      state.isFetchingListCourses = false;
    },
    setIsFetchingWishlist(state, action: PayloadAction<boolean>) {
      state.isFetchingListCourses = action.payload;
    },
    removeCourseFromWishlistRedux(state, action: PayloadAction<string>) {
      state.listCourses = state.listCourses.filter((course) => course._id !== action.payload);
    },
  },
});

export const {
  resetWishlistState,
  setWishlist,
  setIsFetchingWishlist,
  removeCourseFromWishlistRedux,
} = wishlistSlice.actions;

export const fetchWishlist = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;

  dispatch(setIsFetchingWishlist(true));
  const response = await getWishlistApi(authenticationReducer.accessToken);
  if (isResponseError(response)) {
    return dispatch(setWishlist([]));
  }
  dispatch(setWishlist(response.data.courses));
};

export const removeFromWishlist = (courseId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  const response = await removeCourseFromWishlist(authenticationReducer.accessToken, courseId);
  if (!isResponseError(response)) {
    dispatch(removeCourseFromWishlistRedux(courseId));
  }
};

export default wishlistSlice.reducer;