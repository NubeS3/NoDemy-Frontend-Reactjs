import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getRatingsApi from '../apis/getRatings.api';
import { AppThunk } from '../configs/store.config';
import Rating from '../types/Rating.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  listRatings: Array<Rating>(),
  isFetchingListRatings: true,
  totalRatings: 0,
  totalPages: 0,
};

const ratingsSlice = createSlice({
  name: 'ratingsReducer',
  initialState,
  reducers: {
    clearListRatings(state) {
      state.listRatings = [];
    },
    setIsFetchingListRatings(state, action: PayloadAction<boolean>) {
      state.isFetchingListRatings = action.payload;
    },
    setListRatings(state, action: PayloadAction<{
      listRatings: Array<Rating>,
      totalRatings: number,
      totalPages: number,
    }>) {
      state.listRatings = action.payload.listRatings;
      state.totalRatings = action.payload.totalRatings;
      state.totalPages = action.payload.totalPages;
      state.isFetchingListRatings = false;
    },
  },
});

export const {
  clearListRatings,
  setIsFetchingListRatings,
  setListRatings,
} = ratingsSlice.actions;

export const fetchListRatings = (page: number = 1): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { courseReducer } = state;
  if (courseReducer.course && courseReducer.course._id) {
    dispatch(setIsFetchingListRatings(true));

    const response = await getRatingsApi(courseReducer.course._id, page);
    if (isResponseError(response)) {
      return dispatch(clearListRatings());
    }

    return dispatch(setListRatings({
      listRatings: response.data.ratings,
      totalRatings: response.data.totalRatings,
      totalPages: response.data.totalPages
    }));
  }
  dispatch(clearListRatings());
};

export default ratingsSlice.reducer;