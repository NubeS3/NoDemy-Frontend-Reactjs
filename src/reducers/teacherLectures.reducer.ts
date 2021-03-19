import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import addLectureApi from '../apis/addLecture.api';
import deleteLectureApi from '../apis/deleteLecture.api';
import getLecturesApi from '../apis/getLectures.api';
import updateLectureInfoApi from '../apis/updateLectureInfo.api';
import updateLectureVideoApi from '../apis/updateLectureVideo.api';
import { AppThunk } from '../configs/store.config';
import Lecture from '../types/Lecture.type';
import { isResponseError } from '../types/ResponseError.type';

const initialState = {
  listLectures: Array<Lecture>(),
  isFetchingListLectures: true,
  isUploading: false,
  uploadingProgress: 0,
  isModifying: false,
  error: '',
};

const teacherLecturesSlice = createSlice({
  name: 'teacherLecturesReducer',
  initialState,
  reducers: {
    setListLectures(state, action: PayloadAction<Array<Lecture>>) {
      state.listLectures = action.payload;
      state.isFetchingListLectures = false;
    },
    resetListLecturesState(state) {
      state = {...initialState};
    },
    addLectureToRedux(state, action: PayloadAction<Lecture>) {
      state.listLectures.push(action.payload);
    },
    setIsUploading(state, action: PayloadAction<boolean>) {
      state.isUploading = action.payload;
    },
    setUploadingProgress(state, action: PayloadAction<number>) {
      state.uploadingProgress = action.payload;
    },
    setIsModifying(state, action: PayloadAction<boolean>) {
      state.isModifying = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    removeLectureFromRedux(state, action: PayloadAction<string>) {
      state.listLectures = state.listLectures.filter((lecture) => lecture._id !== action.payload);
    },
    updateLectureToRedux(state, action: PayloadAction<Lecture>) {
      for (let i = 0; i < state.listLectures.length; ++i) {
        if (state.listLectures[i]._id === action.payload._id) {
          state.listLectures[i] = action.payload;
          break;
        }
      }
    },
  },
});

export const {
  setListLectures,
  resetListLecturesState,
  addLectureToRedux,
  setIsUploading,
  setUploadingProgress,
  setIsModifying,
  setError,
  removeLectureFromRedux,
  updateLectureToRedux,
} = teacherLecturesSlice.actions;

export const fetchTeacherListLectures = (sectionId: string): AppThunk => async (dispatch) => {
  const response = await getLecturesApi(sectionId);
  if (!isResponseError(response)) {
    return dispatch(setListLectures(response.data.lectures));
  }
};

export const addLecture = (
  sectionId: string,
  canPreview: string,
  lectureName: string,
  video: File
): AppThunk => async (dispatch, getState) => {
  dispatch(setIsUploading(true));
  dispatch(setIsModifying(true));

  const data = new FormData();
  data.append('video', video);
  data.append('sectionId', sectionId);
  data.append('lectureName', lectureName);
  data.append('canPreview', canPreview);

  const state = getState();
  const { authenticationReducer } = state;
  const response = await addLectureApi(authenticationReducer.accessToken, data, (progressEvent: any) => {
    dispatch(setUploadingProgress(progressEvent.loaded));
  });
  dispatch(setIsUploading(false));
  dispatch(setIsModifying(false));
  dispatch(setUploadingProgress(0));

  if (isResponseError(response)) {
    return dispatch(setError(response.error));
  }
  dispatch(addLectureToRedux(response.data.lecture));
};

export const deleteLecture = (lectureId: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  dispatch(setIsModifying(true));
  const response = await deleteLectureApi(authenticationReducer.accessToken, lectureId);
  dispatch(setIsModifying(false));
  if (!isResponseError(response)) {
    dispatch(removeLectureFromRedux(lectureId));
  }
};

export const updateLecture = (lectureId: string, lectureName: string, canPreview: boolean, video: File): AppThunk => async (dispatch, getState) => {
  dispatch(setIsModifying(true));
  const state = getState();
  const { authenticationReducer, teacherLectures } = state;
  dispatch(setIsModifying(true));

  if (video) {
    dispatch(setIsUploading(true));
    const data = new FormData();
    data.append('video', video);
    await updateLectureVideoApi(authenticationReducer.accessToken, lectureId, data, (progressEvent: any) => {
      dispatch(setUploadingProgress(progressEvent.loaded));
    });
    dispatch(setIsUploading(false));
  }

  let lecture: Lecture = null;
  for (let i = 0; i < teacherLectures.listLectures.length; ++i) {
    if (teacherLectures.listLectures[i]._id === lectureId) {
      lecture = teacherLectures.listLectures[i];
      break;
    }
  }
  if (lectureName !== lecture.lectureName || canPreview !== lecture.canPreview) {
    const packed = {
      lectureName,
      canPreview,
    };
    const response = await updateLectureInfoApi(authenticationReducer.accessToken, lectureId, packed);
    if (!isResponseError(response)) {
      dispatch(updateLectureToRedux(response.data.lecture));
    }
  }
  dispatch(setIsModifying(false));
};

export default teacherLecturesSlice.reducer;