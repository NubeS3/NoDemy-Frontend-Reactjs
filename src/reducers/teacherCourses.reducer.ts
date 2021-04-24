import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import deleteCourseApi from '../apis/deleteCourse.api';
import getOwnListCoursesApi from '../apis/getOwnListCourses.api';
import { AppThunk } from '../configs/store.config';
import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  listCourses: Array<CourseBasicInfoProps>(),
  isFetchingListCourses: true,
};

const teacherCoursesSlice = createSlice({
  name: 'teacherCoursesReducer',
  initialState,
  reducers: {
    clearListCourses(state) {
      state.listCourses = [];
      state.isFetchingListCourses = true;
    },
    setListCourses(state, action: PayloadAction<Array<CourseBasicInfoProps>>) {
      state.listCourses = action.payload;
      state.isFetchingListCourses = false;
    },
  },
});

export const {
  clearListCourses,
  setListCourses,
} = teacherCoursesSlice.actions;

export const fetchOwnListCourses = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;

  const response = await getOwnListCoursesApi(authenticationReducer.accessToken);
  console.log(response);
  if (isResponseError(response)) {
    return dispatch(clearListCourses());
  }

  dispatch(setListCourses(response.data.courses));
};

export const deleteCourse = (courseId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer, teacherCoursesReducer } = state;

  const response = await deleteCourseApi(authenticationReducer.accessToken, courseId);
  if (!isResponseError(response)) {
    const courses = teacherCoursesReducer.listCourses.filter((course) => course._id !== courseId);
    dispatch(setListCourses(courses));
  }
}

export default teacherCoursesSlice.reducer;