import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import addCourseApi from '../apis/addCourse.api';
import getOwnCourseApi from '../apis/getOwnCourse.api';
import updateCourseApi from '../apis/updateCourse.api';
import { AppThunk } from '../configs/store.config';
import AddCourse from '../types/AddCourse.type';
import CourseType from '../types/Course.type';
import { isResponseError } from '../types/ResponseError.type';
import UpdateCourse from '../types/UpdateCourse.type';

const initialState = {
  course: null as CourseType,
  isFetchingCourse: true,
  error: '',
  isModifying: false,
};

const teacherCourseSlice = createSlice({
  name: 'teacherCourseReducer',
  initialState,
  reducers: {
    setTeacherCourse(state, action: PayloadAction<CourseType>) {
      state.course = action.payload;
      state.isFetchingCourse = false;
      state.error = '';
    },
    resetTeacherCourseState(state) {
      state.course = null;
      state.isFetchingCourse = true;
      state.error = ''
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setIsModifying(state, action: PayloadAction<boolean>) {
      state.isModifying = action.payload;
    },
  },
});

export const {
  setTeacherCourse,
  resetTeacherCourseState,
  setError,
  setIsModifying,
} = teacherCourseSlice.actions;

export const fetchTeacherCourse = (courseId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  const response = await getOwnCourseApi(authenticationReducer.accessToken, courseId);
  if (isResponseError(response)) {
    return dispatch(setTeacherCourse(null));
  }
  dispatch(setTeacherCourse(response.data.course));
};

export const updateTeacherCourse = (course: UpdateCourse): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer, teacherCourseReducer } = state;
  const packed: UpdateCourse = {};
  dispatch(setIsModifying(true));
  if (course.title !== teacherCourseReducer.course.title) {
    packed.title = course.title;
  }
  if (course.summary !== teacherCourseReducer.course.summary) {
    packed.summary = course.summary;
  }
  if (course.description !== teacherCourseReducer.course.description) {
    packed.description = course.description;
  }
  if (course.coverImage !== teacherCourseReducer.course.coverImage) {
    packed.coverImage = course.coverImage;
  }
  if (course.price !== teacherCourseReducer.course.price) {
    packed.price = course.price;
  }
  if (course.saleRatio !== teacherCourseReducer.course.saleRatio) {
    packed.saleRatio = course.saleRatio;
  }
  if (course.category !== teacherCourseReducer.course.category) {
    packed.category = course.category;
  }
  if (course.isPublic !== teacherCourseReducer.course.isPublic) {
    packed.isPublic = course.isPublic;
  }
  if (course.isFinish !== teacherCourseReducer.course.isFinish) {
    packed.isFinish = course.isFinish;
  }
  const response = await updateCourseApi(teacherCourseReducer.course._id, authenticationReducer.accessToken, packed);
  dispatch(setIsModifying(false));
  if (isResponseError(response)) {
    return dispatch(setError(response.error));
  }
  dispatch(setTeacherCourse(response.data.course));
};

export const addTeacherCourse = (course: AddCourse): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  dispatch(setIsModifying(true));
  const response = await addCourseApi(authenticationReducer.accessToken, course);
  dispatch(setIsModifying(false));
  if (isResponseError(response)) {
    return dispatch(setError(response.error));
  }
  dispatch(setTeacherCourse(response.data.course));
};

export default teacherCourseSlice.reducer;