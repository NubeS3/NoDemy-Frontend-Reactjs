/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from 'react-router-dom';

import loading from '../../assets/loadings/medium.loading.gif';

import { RootState } from "../../reducers/root.reducer";
import { fetchCourseDetails, resetCourse } from '../../reducers/course.reducer';

import RouterProps from "../../types/RouterProps.type";
import { NavBarLink } from '../common/NavBar';
import PageWrapper from "../common/PageWrapper";

import Page404 from '../common/Page404';
import paths from '../../configs/paths.config';
import useWindowDimensions from '../../utils/useWindowDimensions.util';
import { widthScreens } from '../../configs/sizes.config';
import CourseDetailsPc from './CourseDetailsPc/CourseDetailsPc';
import CourseDetailsMobile from './CourseDetailsMobile/CourseDetailsMobile';

const mapStateToProps = (state: RootState) => ({
  course: state.courseReducer.course,
  isFetchingCourse: state.courseReducer.isFetchingCourse,
  fetchCourseError: state.courseReducer.fetchCourseError,
  accessToken: state.authenticationReducer.accessToken,
});

const mapDispatchToProps = {
  fetchCourseDetails,
  resetCourse
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CourseDetailsProps = ConnectedProps<typeof connector> & RouterProps;

const CourseDetails: FunctionComponent<CourseDetailsProps> = ({
  history,
  isFetchingCourse,
  fetchCourseDetails,
  course,
  fetchCourseError,
  resetCourse,
  accessToken
}) => {
  const { width } = useWindowDimensions();
  const [courseId, setCourseId] = useState('');

  const [links, setLinks] = useState<Array<NavBarLink>>([]);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }

    return () => {
      resetCourse();
    };
  }, [courseId, accessToken]);

  useEffect(() => {
    if (history.location.pathname.split('/')[2]) {
      return setCourseId(history.location.pathname.split('/')[2])
    }
    setCourseId('');
  }, [history.location.pathname]);

  useEffect(() => {
    if (course !== null) {
      setLinks([{
        name: 'Home',
        url: paths.base,
      }, {
        name: 'Courses',
        url: paths.listCourses(),
      }, {
        name: course.title,
        url: paths.courseDetails(course._id),
      }]);
    }
  }, [course]);

  if (isFetchingCourse) {
    return (
      <div style={{ width: 150, margin: 'auto' }}>
        <img src={loading} alt="Loading..." />
      </div>
    );
  }
  
  if (fetchCourseError) {
    return <Page404 />
  }

  return (
    <PageWrapper links={links} history={history}>
    {
      width >= widthScreens.l && course &&
      <CourseDetailsPc history={history} />
    }
    {
      width < widthScreens.l && course &&
      <CourseDetailsMobile history={history} />
    }
    </PageWrapper>
  );
};

export default withRouter(connector(CourseDetails));