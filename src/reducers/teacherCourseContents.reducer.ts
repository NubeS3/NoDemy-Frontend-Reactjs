import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import addSectionApi from '../apis/addSection.api';
import deleteSectionApi from '../apis/deleteSection.api';
import getOwnSectionsApi from '../apis/getOwnSections.api';
import updateSectionApi from '../apis/updateSection.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import Section from '../types/Section.type';

const initialState = {
  listSections: Array<Section>(),
  isFetchingListSections: true,
  error: '',
  isModifying: false,
};

const teacherCourseContentsSlice = createSlice({
  name: 'teacherCourseContentsReducer',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setSections(state, action: PayloadAction<Array<Section>>) {
      state.listSections = action.payload;
      state.error = '';
    },
    setIsFetchingListSections(state, action: PayloadAction<boolean>) {
      state.isFetchingListSections = action.payload;
    },
    resetState(state) {
      state = {...initialState};
    },
    setIsModifying(state, action: PayloadAction<boolean>) {
      state.isModifying = action.payload;
    },
    addSectionToRedux(state, action: PayloadAction<Section>) {
      state.listSections.push(action.payload);
    },
    editSectionInRedux(state, action: PayloadAction<{
      sectionId: string,
      sectionName: string,
    }>) {
      for (let i = 0; i < state.listSections.length; ++i) {
        if (state.listSections[i]._id === action.payload.sectionId) {
          state.listSections[i].sectionName = action.payload.sectionName;
          break;
        }
      }
    },
    removeSectionFromRedux(state, action: PayloadAction<string>) {
      state.listSections = state.listSections.filter(section => section._id !== action.payload);
    },
  },
});

export const {
  setError,
  setSections,
  setIsFetchingListSections,
  resetState,
  setIsModifying,
  addSectionToRedux,
  editSectionInRedux,
  removeSectionFromRedux,
} = teacherCourseContentsSlice.actions;

export const fetchTeacherListSections = (courseId: string): AppThunk => async (dispatch, getState) => {
  dispatch(setIsFetchingListSections(true));
  const state = getState();
  const { authenticationReducer } = state;
  const response = await getOwnSectionsApi(courseId, authenticationReducer.accessToken);
  if (isResponseError(response)) {
    return dispatch(setError(response.error));
  }

  dispatch(setIsFetchingListSections(false));
  dispatch(setSections(response.data.sections));
};

export const addSection = (sectionName: string, courseId: string): AppThunk => async (dispatch, getState) => {
  dispatch(setIsModifying(true));
  const state = getState();
  const { authenticationReducer } = state;
  const response = await addSectionApi(authenticationReducer.accessToken, {
    sectionName,
    courseId,
  });
  dispatch(setIsModifying(false));
  if (isResponseError(response)) {
    return;
  }
  dispatch(addSectionToRedux({
    _id: response.data.section._id,
    sectionName: response.data.section.sectionName,
    courseId: response.data.section.courseId,
    lectures: [],
  }));
};

export const updateSection = (sectionId: string, sectionName: string): AppThunk => async (dispatch, getState) => {
  dispatch(setIsModifying(true));
  const state = getState();
  const { authenticationReducer } = state;
  const response = await updateSectionApi(authenticationReducer.accessToken, sectionId, sectionName);
  dispatch(setIsModifying(false));
  if (isResponseError(response)) {
    return;
  }
  dispatch(editSectionInRedux({ sectionId, sectionName }));
};

export const deleteSection = (sectionId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  const response = await deleteSectionApi(authenticationReducer.accessToken, sectionId);
  if (!isResponseError(response)) {
    dispatch(removeSectionFromRedux(sectionId));
  }
};

export default teacherCourseContentsSlice.reducer;