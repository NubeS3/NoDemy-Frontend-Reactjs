import {combineReducers} from '@reduxjs/toolkit';

import adminAuthorizationReducer from "./adminAuthorization.reducer";
import authorizationReducer from './authorization.reducer';
import authenticationReducer from './authentication.reducer';
import accountReducer from './account.reducer';
import hotCoursesReducer from './hotCourses.reducer';
import newCoursesReducer from './newCourses.reducer';
import topViewedCoursesReducer from './topViewedCourses.reducer';
import categoriesReducer from './categories.reducer';
import listCoursesReducer from './listCourses.reducer';
import listCoursesAdminReducer from './listCoursesAdmin.reducer';
import courseReducer from './course.reducer';
import ratingsReducer from './ratings.reducer';
import ratingReducer from './rating.reducer';
import usersReducer from './users.reducer';
import teacherCoursesReducer from './teacherCourses.reducer';
import coursesSameCategoryReducer from './coursesSameCategory.reducer';
import teacherCourseReducer from './teacherCourse.reducer';
import teacherCourseContentsReducer from './teacherCourseContents.reducer';
import teacherLectures from './teacherLectures.reducer';
import wishlistReducer from './wishlist.reducer';
import boughtCoursesReducer from './boughtCourses.reducer';

const rootReducer = combineReducers({
    adminAuthorizationReducer,
    usersReducer,
    authorizationReducer,
    authenticationReducer,
    accountReducer,
    hotCoursesReducer,
    newCoursesReducer,
    topViewedCoursesReducer,
    categoriesReducer,
    listCoursesReducer,
    listCoursesAdminReducer,
    courseReducer,
    ratingsReducer,
    ratingReducer,
    teacherCoursesReducer,
    coursesSameCategoryReducer,
    teacherCourseReducer,
    teacherCourseContentsReducer,
    teacherLectures,
    wishlistReducer,
    boughtCoursesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;