import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import addCourseToWishlistApi from '../apis/addCourseToWishlist.api';
import buyCourseApi from '../apis/buyCourse.api';
import getCourseDetailsApi from '../apis/getCourseDetails.api';
import getLecturesApi from '../apis/getLectures.api';
import getSectionsApi from '../apis/getSections.api';
import removeCourseFromWishlist from '../apis/removeCourseFromWishlist.api';
import localStorageKeys from '../configs/localStorageKeys.config';
import {AppThunk} from '../configs/store.config';

import CourseDetails from '../types/Course.type';
import Lecture from '../types/Lecture.type';
import {isResponseError} from '../types/ResponseError.type';
import Section from '../types/Section.type';
import {loginFailed} from './authorization.reducer';
import getLectureVideoApi from "../apis/getLectureVideo.api";

const initialState = {
    course: null as CourseDetails,
    isFetchingCourse: true,
    fetchCourseError: '',
    sections: Array<Section>(),
    isFetchingSections: true,
    lectures: Array<Array<Lecture>>(),
    currentSelectedLecture: '',
    currentVideoUrl: '',
};

const checkCourseIsInCart = (course: CourseDetails): boolean => {
    const cart = JSON.parse(localStorage.getItem(localStorageKeys.cart));
    let isInCart = false;

    if (cart && Array.isArray(cart)) {
        for (let i = 0; i < cart.length; ++i) {
            if (course._id === cart[i]) {
                isInCart = true;
                break;
            }
        }
    }

    return isInCart;
};

const courseSlice = createSlice({
    name: 'courseReducer',
    initialState,
    reducers: {
        setCourseDetails(state, action: PayloadAction<{
            course: CourseDetails,
            error: string,
        }>) {
            const isInCart = checkCourseIsInCart(action.payload.course);

            state.course = {
                ...action.payload.course,
                isInCart,
            };
            state.fetchCourseError = action.payload.error;
            state.isFetchingCourse = false;
        },
        setSections(state, action: PayloadAction<Array<Section>>) {
            state.sections = action.payload;
            state.lectures = Array<Array<Lecture>>(state.sections.length);
            state.isFetchingSections = false;
        },
        setLectures(state, action: PayloadAction<{
            lectures: Array<Lecture>,
            index: number
        }>) {
            if (action.payload.index === 0) {
                if (action.payload.lectures.length > 0) {
                    state.currentSelectedLecture = action.payload.lectures[0]._id;
                }
            }
            state.lectures[action.payload.index] = action.payload.lectures;
        },
        resetCourse(state) {
            state.course = null;
            state.fetchCourseError = '';
            state.isFetchingCourse = true;
            state.sections = [];
            state.isFetchingSections = true;
            state.currentSelectedLecture = '';
        },
        addCourseToCart(state) {
            const isInCart = checkCourseIsInCart(state.course);
            if (isInCart && !state.course.isInCart) {
                state.course.isInCart = true;
            } else if (!isInCart) {
                const cart: Array<string> = JSON.parse(localStorage.getItem(localStorageKeys.cart)) || [];
                cart.push(state.course._id);
                localStorage.setItem(localStorageKeys.cart, JSON.stringify(cart));
                state.course.isInCart = true;
            }
        },
        removeCourseFromCart(state) {
            const isInCart = checkCourseIsInCart(state.course);
            if (isInCart) {
                let cart: Array<string> = JSON.parse(localStorage.getItem(localStorageKeys.cart)) || [];
                cart = cart.filter(item => item !== state.course._id);
                localStorage.setItem(localStorageKeys.cart, JSON.stringify(cart));
                state.course.isInCart = false;
            }
        },
        setCurrentLectureUrl(state, action: PayloadAction<string>) {
            state.currentVideoUrl = action.payload;
        },
        setSelectedLecture(state, action: PayloadAction<string>) {
            state.currentSelectedLecture = action.payload;
        }
    },
});

export const {
    setCourseDetails,
    setSections,
    setLectures,
    resetCourse,
    addCourseToCart,
    removeCourseFromCart,
    setCurrentLectureUrl,
    setSelectedLecture,
} = courseSlice.actions;

export const fetchCourseDetails = (courseId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {authenticationReducer} = state;

    const response = await getCourseDetailsApi(authenticationReducer.accessToken, courseId);
    if (isResponseError(response)) {
        return dispatch(setCourseDetails({course: null, error: response.error}));
    }

    dispatch(setCourseDetails({course: response.data.course, error: ''}));
};

export const fetchSections = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {courseReducer} = state;
    if (courseReducer.course) {
        if (courseReducer.course._id && courseReducer.sections.length === 0) {
            const response = await getSectionsApi(courseReducer.course._id);
            if (isResponseError(response)) {
                return dispatch(setSections([]));
            }

            dispatch(setSections(response.data.sections));
        }
    }
};

export const fetchLectures = (index: number): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {courseReducer} = state;

    if ((!courseReducer.lectures[index] || courseReducer.lectures[index].length === 0) && courseReducer.sections[index]) {
        const response = await getLecturesApi(courseReducer.sections[index]._id);
        if (isResponseError(response)) {
            return dispatch(setLectures({lectures: [], index: index}));
        }
        return dispatch(setLectures({lectures: response.data.lectures, index: index}));
    }
};

export const buyCourse = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {courseReducer, authenticationReducer} = state;

    const response = await buyCourseApi(courseReducer.course._id, authenticationReducer.accessToken);
    if (isResponseError(response)) {
        if (response.code === 401) {
            dispatch(resetCourse());
            return dispatch(loginFailed(''));
        }
        return;
    }
    dispatch(removeCourseFromCart());
    dispatch(setCourseDetails({
        course: {
            ...courseReducer.course,
            isBought: true,
        },
        error: ''
    }));
};

export const getCurrentLearningLecture = (): AppThunk => async (dispatch) => {

};

export const setCurrentLearningLecture = (lectureId: string): AppThunk => (dispatch) => {
    dispatch(setSelectedLecture(lectureId));
};

export const getLectureVideoUrl = (lectureId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const response = await getLectureVideoApi(authenticationReducer.accessToken, lectureId);
    if (!isResponseError(response)) {
        dispatch(setCurrentLectureUrl(response.data.url));
    }
};

export const addToWishlist = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {courseReducer, authenticationReducer} = state;
    const response = await addCourseToWishlistApi(authenticationReducer.accessToken, courseReducer.course._id);
    if (!isResponseError(response)) {
        dispatch(setCourseDetails({
            course: {
                ...courseReducer.course,
                isInWishlist: true,
            },
            error: ''
        }));
    }
};

export const removeFromWishlist = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {courseReducer, authenticationReducer} = state;
    const response = await removeCourseFromWishlist(authenticationReducer.accessToken, courseReducer.course._id);
    if (!isResponseError(response)) {
        dispatch(setCourseDetails({
            course: {
                ...courseReducer.course,
                isInWishlist: false,
            },
            error: ''
        }));
    }
};

export default courseSlice.reducer;