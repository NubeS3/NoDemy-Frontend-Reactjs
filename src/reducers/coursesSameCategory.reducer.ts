import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCoursesSameCategoryApi from '../apis/getCoursesSameCategory.api';
import { AppThunk } from '../configs/store.config';
import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  listCourses: Array<CourseBasicInfoProps>(),
  isFetchingCoursesSameCategory: true,
};

const coursesSameCategorySlice = createSlice({
  name: 'coursesSameCategoryReducer',
  initialState,
  reducers: {
    setCoursesSameCategory(state, action: PayloadAction<Array<CourseBasicInfoProps>>) {
      state.listCourses = action.payload;
      state.isFetchingCoursesSameCategory = false;
    },
    resetCoursesSameCategoryState(state) {
      state.listCourses = [];
      state.isFetchingCoursesSameCategory = true;
    }
  }
});

export const {
  setCoursesSameCategory,
  resetCoursesSameCategoryState,
} = coursesSameCategorySlice.actions;

export const fetchCoursesSameCategory = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer, courseReducer } = state;

  const response = await getCoursesSameCategoryApi(authenticationReducer.accessToken, courseReducer.course._id);
  if (isResponseError(response)) {
    return dispatch(setCoursesSameCategory([]));
  }

  dispatch(setCoursesSameCategory(response.data.courses));
};

export default coursesSameCategorySlice.reducer;