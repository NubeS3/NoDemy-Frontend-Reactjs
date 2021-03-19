import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getBoughtCoursesApi from '../apis/getBoughtCourses.api';
import { AppThunk } from '../configs/store.config';
import CourseBasicInfoProps from '../types/CourseBasicInfoProps.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  listCourses: Array<CourseBasicInfoProps>(),
  isFetchingListCourses: true,
};

const boughtCoursesSlice = createSlice({
  name: 'boughtCoursesReducer',
  initialState,
  reducers: {
    resetBoughtCoursesState(state) {
      state = {...initialState};
    },
    setIsFetchingBoughtCourses(state, action: PayloadAction<boolean>) {
      state.isFetchingListCourses = action.payload;
    },
    setBoughtCourses(state, action: PayloadAction<Array<CourseBasicInfoProps>>) {
      state.listCourses = action.payload;
      state.isFetchingListCourses = false;
    },
  },
});

export const {
  resetBoughtCoursesState,
  setIsFetchingBoughtCourses,
  setBoughtCourses,
} = boughtCoursesSlice.actions;

export const fetchBoughtCourses = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsFetchingBoughtCourses(true));
  const state = getState();
  const { authenticationReducer } = state;
  const response = await getBoughtCoursesApi(authenticationReducer.accessToken);
  dispatch(setIsFetchingBoughtCourses(false));
  if (!isResponseError(response)) {
    dispatch(setBoughtCourses(response.data.courses));
  }
};

export default boughtCoursesSlice.reducer;