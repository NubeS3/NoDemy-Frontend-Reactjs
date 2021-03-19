import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getHotCoursesApi from '../apis/getHotCourses.api';
import { AppThunk } from '../configs/store.config';

import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  hotCourses: Array<CourseBasicInfoProps>(),
  isFetchingHotCourses: true,
};

const hotCoursesSlice = createSlice({
  name: 'hotCoursesReducer',
  initialState,
  reducers: {
    setHotCourses(state, action: PayloadAction<Array<CourseBasicInfoProps>>) {
      state.hotCourses = action.payload;
      state.isFetchingHotCourses = false;
    }
  },
});

export const {
  setHotCourses,
} = hotCoursesSlice.actions;

export const fetchHotCourses = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;

  const response = await getHotCoursesApi(authenticationReducer.accessToken);
  if (isResponseError(response)) {
    return dispatch(setHotCourses([]));
  }

  dispatch(setHotCourses(response.data.courses));
};

export default hotCoursesSlice.reducer;
