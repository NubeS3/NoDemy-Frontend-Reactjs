import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getNewCoursesApi from '../apis/getNewCourses.api';
import { AppThunk } from '../configs/store.config';

import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  newCourses: Array<CourseBasicInfoProps>(),
  isFetchingNewCourses: true,
};

const newCoursesSlice = createSlice({
  name: 'newCoursesReducer',
  initialState,
  reducers: {
    setNewCourses(state, action: PayloadAction<Array<CourseBasicInfoProps>>) {
      state.newCourses = action.payload;
      state.isFetchingNewCourses = false;
    }
  },
});

export const {
  setNewCourses,
} = newCoursesSlice.actions;

export const fetchNewCourses = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;

  const response = await getNewCoursesApi(authenticationReducer.accessToken);
  if (isResponseError(response)) {
    return dispatch(setNewCourses([]));
  }

  dispatch(setNewCourses(response.data.courses));
};

export default newCoursesSlice.reducer;
