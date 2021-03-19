/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";

import { RootState } from "../../reducers/root.reducer";
import { fetchCourseDetails, resetCourse, fetchSections, fetchLectures } from '../../reducers/course.reducer';
import RouterProps from "../../types/RouterProps.type";
import paths from "../../configs/paths.config";
import PageWrapper from "../common/PageWrapper";
import { NavBarLink } from "../common/NavBar";
import Sections from "../Sections/Sections";

import loading from '../../assets/loadings/medium.loading.gif';
import ReactPlayer from "react-player";
import endpoints from "../../configs/endpoints.config";
import useWindowDimensions from "../../utils/useWindowDimensions.util";

const mapStateToProps = (state: RootState) => ({
  course: state.courseReducer.course,
  isFetchingCourse: state.courseReducer.isFetchingCourse,
  sections: state.courseReducer.sections,
  isFetchingSections: state.courseReducer.isFetchingSections,
  currentSelectedLecture: state.courseReducer.currentSelectedLecture,
  accessToken: state.authenticationReducer.accessToken,
  lectures: state.courseReducer.lectures,
});

const mapDispatchToProps = {
  fetchCourseDetails,
  resetCourse,
  fetchLectures,
  fetchSections,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type LearningVideoProps = ConnectedProps<typeof connector> & RouterProps;

const LearningVideo = ({
  course,
  resetCourse,
  history,
  isFetchingCourse,
  fetchSections,
  fetchCourseDetails,
  fetchLectures,
  sections,
  isFetchingSections,
  currentSelectedLecture,
  accessToken,
  lectures,
}: LearningVideoProps) => {
  const { width } = useWindowDimensions();

  const courseId = history.location.pathname.split('/')[2];

  const [links, setLinks] = useState<Array<NavBarLink>>([]);

  const [lectureTitle, setLectureTitle] = useState('');

  useEffect(() => {
    fetchCourseDetails(courseId);

    return () => {
      resetCourse();
    };
  }, []);

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
      }, {
        name: 'Course learning content',
        url: `${paths.courseDetails(course._id)}/learn`
      }]);

      fetchSections();
    }
  }, [course]);

  useEffect(() => {
    sections.forEach((_, index) => {
      fetchLectures(index);
    });
  }, [sections]);

  useEffect(() => {
    if (currentSelectedLecture) {
      for (let i = 0; i < lectures.length; ++i) {
        let isFound = false;
        for (let j = 0; j < lectures[i].length; ++j) {
          if (lectures[i][j]._id === currentSelectedLecture) {
            setLectureTitle(lectures[i][j].lectureName);
            isFound = true;
            break;
          }
        }
        if (isFound) {
          break;
        }
      }
    }
  }, [currentSelectedLecture]);

  if (!isFetchingCourse && course && !course.isBought) {
    return <Redirect to={`${paths.courseDetails(courseId)}`} />
  }

  if (isFetchingCourse || isFetchingSections) {
    return (
      <div style={{ width: '150px', margin: 'auto' }}>
        <img src={loading} alt="Loading..." />
      </div>
    )
  }

  return (
    <PageWrapper history={history} links={links}>
      <div className="LearningVideo">
        <Grid container>
          <Grid item xs={12} lg={8}>
          {
            currentSelectedLecture &&
            <>
              <Typography
                variant="h6"
                style={{
                  border: '1px solid #dcdacb',
                  padding: '15px',
                  background: 'white',
                  borderBottom: 'none',
                  borderRight: 'none'
                }}
              >
                {lectureTitle}
              </Typography>
              <ReactPlayer
                controls
                url={`${endpoints.lecture(currentSelectedLecture)}/video?token=${accessToken}`}
                height={width >= 1280 ? (((width / 12) * 8) * 9) / 16 : (width * 9) / 16}
                width={width >= 1280 ? (width / 12) * 8 : '100%'}
              />
            </>
          }
          {
            !currentSelectedLecture &&
            <div style={{ width: '150px', margin: 'auto' }}>
              <img src={loading} alt="Loading video..." />
            </div>
          }
          </Grid>
          <Grid item xs={12} lg={4} style={{ minHeight: '350px' }}>
            <Typography
              variant="h6"
              style={{
                border: '1px solid #dcdacb',
                padding: '15px',
                background: 'white',
                borderBottom: 'none'
              }}
            >
              Course content
            </Typography>
            <Sections />
          </Grid>
        </Grid>
      </div>
    </PageWrapper>
  );
};

export default withRouter(connector(LearningVideo));
