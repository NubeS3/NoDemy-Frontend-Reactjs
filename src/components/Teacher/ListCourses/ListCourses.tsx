/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

import paths from "../../../configs/paths.config";
import { RootState } from "../../../reducers/root.reducer";
import RouterProps from "../../../types/RouterProps.type";
import { NavBarLink } from "../../common/NavBar";
import PageWrapper from "../../common/PageWrapper";

import Course from './Course/Course';

import '../../../styles/components/Teacher/ListCourses/ListCourses.scss';
import loading from '../../../assets/loadings/medium.loading.gif';

import { fetchOwnListCourses, clearListCourses } from '../../../reducers/teacherCourses.reducer';

const mapStateToProps = (state: RootState) => ({
  listCourses: state.teacherCoursesReducer.listCourses,
  isFetchingListCourses: state.teacherCoursesReducer.isFetchingListCourses,
  accessToken: state.authenticationReducer.accessToken,
  user: state.accountReducer.user,
});

const mapDispatchToProps = {
  fetchOwnListCourses,
  clearListCourses,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ListCoursesProps = ConnectedProps<typeof connector> & RouterProps;

const ListCourses = ({
  history,
  fetchOwnListCourses,
  listCourses,
  isFetchingListCourses,
  clearListCourses,
  accessToken,
  user,
}: ListCoursesProps) => {
  const links: Array<NavBarLink> = [{
    name: 'Home',
    url: paths.base,
  }, {
    name: 'Teacher',
    url: paths.teacher,
  }];

  const [searchPattern, changeSearchPattern] = useState('');

  useEffect(() => {
    if (!accessToken || user.accountType === 'Student') {
      return history.push(paths.base);
    }

    fetchOwnListCourses();

    return () => {
      clearListCourses()
    };
  }, []);

  useEffect(() => {
    if (!accessToken || !user || user.accountType === 'Student') {
      history.push(paths.base);
    }
  }, [accessToken, user]);

  return (
    <PageWrapper history={history} links={links}>
      <div className="TeacherListCourses">
        <div className="TeacherListCourses__header">
          <TextField
            variant="outlined"
            label="Search your courses by name"
            className="TeacherListCourses__search-courses"
            value={searchPattern}
            onChange={(e) => changeSearchPattern(e.target.value)}
          />
          <Button
            className="TeacherListCourses__add-course"
            variant="contained"
            onClick={() => history.push(paths.addCourse)}
          >
            Add course
          </Button>
        </div>
        <div className="ListCourses__body">
          {
            isFetchingListCourses &&
            <div style={{ width: '150px', margin: 'auto' }}>
              <img src={loading} alt="Loading..." />
            </div>
          }
          {
            !isFetchingListCourses && Array.isArray(listCourses) && listCourses.map((course) => {
              if (course.title.toLowerCase().includes(searchPattern.toLowerCase())) {
                return <Course key={course._id} course={course} history={history} />
              }
              return null;
            })
          }
        </div>
      </div>
    </PageWrapper>
  );
};

export default withRouter(connector(ListCourses));