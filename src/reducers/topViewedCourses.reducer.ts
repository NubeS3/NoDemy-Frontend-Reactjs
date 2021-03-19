import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getTopViewedCoursesApi from '../apis/getTopViewedCourses.api';
import { AppThunk } from '../configs/store.config';

import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  topViewedCourses: Array<CourseBasicInfoProps>(),
  isFetchingTopViewedCourses: true,
};

const topViewedCoursesSlice = createSlice({
  name: 'topViewedCoursesReducer',
  initialState,
  reducers: {
    setTopViewedCourses(state, action: PayloadAction<Array<CourseBasicInfoProps>>) {
      state.topViewedCourses = action.payload;
      state.isFetchingTopViewedCourses = false;
    }
  },
});

export const {
  setTopViewedCourses,
} = topViewedCoursesSlice.actions;

export const fetchTopViewedCourses = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;

  const response = await getTopViewedCoursesApi(authenticationReducer.accessToken);
  if (isResponseError(response)) {
    return dispatch(setTopViewedCourses([]));
  }

  dispatch(setTopViewedCourses(response.data.courses));
};

export default topViewedCoursesSlice.reducer;
