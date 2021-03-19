import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import deleteCourseApi from '../apis/deleteCourse.api';
import getListCoursesAdminApi from '../apis/getCoursesAdmin.api';
import { AppThunk } from '../configs/store.config';
import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  listCourses: Array<CourseBasicInfoProps>(),
};

const listCoursesAdminSlice = createSlice({
  name: 'listCoursesReducerAdmin',
  initialState,
  reducers: {
    setListCourses(state, action: PayloadAction<{
      listCourses: Array<CourseBasicInfoProps>,
    }>) {
      state.listCourses = action.payload.listCourses;
    },

    clearListCourses(state) {
      state.listCourses = [];
    },
  },
});

export const {
  setListCourses,
  clearListCourses,
} = listCoursesAdminSlice.actions;

export const fetchListCourses = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;

  const response = await getListCoursesAdminApi(authenticationReducer.accessToken);

  if (isResponseError(response)) {
    return dispatch(clearListCourses());
  }

  dispatch(setListCourses({
    listCourses: response.data.courses,
  }));
};

export const deleteCourse = (courseId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer, listCoursesAdminReducer } = state;

  const response = await deleteCourseApi(authenticationReducer.accessToken, courseId);
  if (!isResponseError(response)) {
    dispatch(setListCourses({
        listCourses: listCoursesAdminReducer.listCourses.filter(course => course._id !== courseId),
    }));
  }
}

export default listCoursesAdminSlice.reducer;
