/* eslint-disable react-hooks/exhaustive-deps */
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";

import { RootState } from "../../../reducers/root.reducer";
import { fetchCoursesSameCategory, resetCoursesSameCategoryState } from '../../../reducers/coursesSameCategory.reducer';

import '../../../styles/components/CourseDetails/CourseDetailsMobile/CourseDetailsFooterMobile.scss';
import loading from '../../../assets/loadings/medium.loading.gif';

import CoursesSlider from "../../Home/CoursesSlider";

const mapStateToProps = (state: RootState) => ({
  listCourses: state.coursesSameCategoryReducer.listCourses,
  isFetchingCoursesSameCategory: state.coursesSameCategoryReducer.isFetchingCoursesSameCategory,
  course: state.courseReducer.course,
});

const mapDispatchToProps = {
  fetchCoursesSameCategory,
  resetCoursesSameCategoryState
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CourseDetailsFooterMobileProps = ConnectedProps<typeof connector>; 

const CourseDetailsFooterMobile = ({
  listCourses,
  isFetchingCoursesSameCategory,
  fetchCoursesSameCategory,
  resetCoursesSameCategoryState,
  course,
}: CourseDetailsFooterMobileProps) => {
  useEffect(() => {
    if (course) {
      fetchCoursesSameCategory();
    }

    return () => {
      resetCoursesSameCategoryState();
    }
  }, [course]);

  return (
    <div className="CourseDetailsFooterMobile">
      <Typography variant="h5" style={{ marginBottom: '20px', marginLeft: '10px' }}>You may also like:</Typography>
      {
        isFetchingCoursesSameCategory &&
        <div style={{ width: '150px', margin: 'auto' }}>
          <img src={loading} alt="Loading..." />
        </div>
      }
      {
        !isFetchingCoursesSameCategory && listCourses.length > 0 &&
        <CoursesSlider courses={listCourses} />
      }
    </div>
  );
};

export default connector(CourseDetailsFooterMobile);