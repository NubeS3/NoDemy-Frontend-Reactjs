import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import deleteCourseApi from '../apis/deleteCourse.api';
import getListCoursesApi from '../apis/getListCourses.api';
import { AppThunk } from '../configs/store.config';
import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  listCourses: Array<CourseBasicInfoProps>(),
  totalCourses: 0,
  totalPages: 0,
  isFetchingListCourses: true,
};

const listCoursesSlice = createSlice({
  name: 'listCoursesReducer',
  initialState,
  reducers: {
    setListCourses(state, action: PayloadAction<{
      listCourses: Array<CourseBasicInfoProps>,
      totalCourses: number,
      totalPages: number,
    }>) {
      state.listCourses = action.payload.listCourses;
      state.totalCourses = action.payload.totalCourses;
      state.totalPages = action.payload.totalPages;

      state.isFetchingListCourses = false;
    },

    clearListCourses(state) {
      state.listCourses = [];
      state.isFetchingListCourses = false;
    },
    setIsFetchingListCourses(state, action: PayloadAction<boolean>) {
      state.isFetchingListCourses = action.payload;
    }
  },
});

export const {
  setListCourses,
  clearListCourses,
  setIsFetchingListCourses,
} = listCoursesSlice.actions;

export const fetchListCourses = (
  title: string,
  category: string,
  sort: string,
  page: string
): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  
  dispatch(setIsFetchingListCourses(true));

  const response = await getListCoursesApi(
    authenticationReducer.accessToken,
    title,
    category,
    sort,
    page
  );

  if (isResponseError(response)) {
    return dispatch(clearListCourses());
  }

  dispatch(setListCourses({
    listCourses: response.data.courses,
    totalCourses: response.data.totalCourses,
    totalPages: response.data.totalPages,
  }));
  };

export const deleteCourse = (courseId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;

  const response = await deleteCourseApi(authenticationReducer.accessToken, courseId);
  if (!isResponseError(response)) {
    const res = await getListCoursesApi(
      authenticationReducer.accessToken,
      '',
      '',
      '',
      ''
    );
    if (!isResponseError(res)) {
      dispatch(setListCourses({
        listCourses: res.data.courses,
        totalCourses: res.data.totalCourses,
        totalPages: res.data.totalPages,
      }));
    }
  }
}

export default listCoursesSlice.reducer;
