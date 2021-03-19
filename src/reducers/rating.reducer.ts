import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import createRatingApi from '../apis/createRating.api';
import getOwnRatingApi from '../apis/getOwnRating.api';
import updateRatingApi from '../apis/updateRating.api';
import { AppThunk } from '../configs/store.config';
import RatingType from '../types/Rating.type';
import { isResponseError } from '../types/ResponseError.type';
import { fetchCourseDetails } from './course.reducer';

const initialState = {
  rating: {
    _id: '',
    description: '',
    rating: 0,
  },
  isFetchingRating: true,
  isSubmittingRating: false,
};

const ratingSlice = createSlice({
  name: 'ratingReducer',
  initialState,
  reducers: {
    resetRatingState(state) {
      state.rating = initialState.rating;
      state.isFetchingRating = true;
      state.isSubmittingRating = false;
    },
    setRating(state, action: PayloadAction<RatingType>) {
      state.rating = action.payload;
      state.isFetchingRating = false;
    },
    setIsFetchingRating(state, action: PayloadAction<boolean>) {
      state.isFetchingRating = action.payload;
    },
    setIsSubmittingRating(state, action: PayloadAction<boolean>) {
      state.isSubmittingRating = action.payload;
    },
  },
});

export const {
  resetRatingState,
  setRating,
  setIsFetchingRating,
  setIsSubmittingRating,
} = ratingSlice.actions;

export const createOrUpdate = (description: string = '', rating: number): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer, courseReducer, ratingReducer } = state;
  if (!authenticationReducer.accessToken || !courseReducer.course._id) {
    return;
  }

  dispatch(setIsSubmittingRating(true));

  let response;
  if (!ratingReducer.rating._id) {
    response = await createRatingApi(authenticationReducer.accessToken, {
      description,
      courseId: courseReducer.course._id,
      rating
    });
  }
  else {
    response = await updateRatingApi(authenticationReducer.accessToken, ratingReducer.rating._id, {
      description,
      rating,
    });
  }

  dispatch(setIsSubmittingRating(false));
  dispatch(fetchCourseDetails(courseReducer.course._id));
  if (isResponseError(response)) {
    return dispatch(resetRatingState());
  }

  dispatch(setRating(response.data.rating));
};

export const getOwnRating = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer, courseReducer } = state;

  dispatch(setIsFetchingRating(true));

  if (courseReducer.course && courseReducer.course._id) {
    const response = await getOwnRatingApi(courseReducer.course._id, authenticationReducer.accessToken);
    if (isResponseError(response)) {
      return dispatch(resetRatingState());
    }
    return dispatch(setRating(response.data.rating));
  }

  dispatch(resetRatingState());
};

export default ratingSlice.reducer;