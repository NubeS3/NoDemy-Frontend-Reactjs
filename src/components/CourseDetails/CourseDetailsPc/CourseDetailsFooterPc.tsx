/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Typography } from "@material-ui/core";

import { RootState } from "../../../reducers/root.reducer";
import { fetchCoursesSameCategory, resetCoursesSameCategoryState } from '../../../reducers/coursesSameCategory.reducer';

import '../../../styles/components/CourseDetails/CourseDetailsPc/CourseDetailsFooterPc.scss';
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

type CourseDetailsFooterPcProps = ConnectedProps<typeof connector>;

const CourseDetailsFooterPc = ({
  listCourses,
  isFetchingCoursesSameCategory,
  fetchCoursesSameCategory,
  resetCoursesSameCategoryState,
  course,
}: CourseDetailsFooterPcProps) => {
  useEffect(() => {
    if (course) {
      fetchCoursesSameCategory();
    }

    return () => {
      resetCoursesSameCategoryState();
    }
  }, [course]);

  return (
    <div className="CourseDetailsFooterPc" style={{ marginBottom: '20px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>You may also like:</Typography>
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

export default connector(CourseDetailsFooterPc);