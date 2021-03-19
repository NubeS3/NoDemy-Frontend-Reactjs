/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import paths from '../../../configs/paths.config';

import { RootState } from '../../../reducers/root.reducer';
import { fetchTeacherCourse, resetTeacherCourseState } from '../../../reducers/teacherCourse.reducer';
import { fetchTeacherListSections, resetState } from '../../../reducers/teacherCourseContents.reducer';

import '../../../styles/components/Teacher/ListSections/ListSections.scss';
import loading from '../../../assets/loadings/medium.loading.gif';

import RouterProps from '../../../types/RouterProps.type';
import { NavBarLink } from '../../common/NavBar';
import PageWrapper from '../../common/PageWrapper';
import Section from './Section/Section';
import { Button, TextField } from '@material-ui/core';
import AddEditSectionModal from '../AddEditSectionModal/AddEditSectionModal';

const mapStateToProps = (state: RootState) => ({
  listSections: state.teacherCourseContentsReducer.listSections,
  isFetchingListSections: state.teacherCourseContentsReducer.isFetchingListSections,
  error: state.teacherCourseContentsReducer.error,
  course: state.teacherCourseReducer.course,
  isFetchingListCourses: state.teacherCourseContentsReducer.isFetchingListSections,
  accessToken: state.authenticationReducer.accessToken,
  user: state.accountReducer.user,
});

const mapDispatchToProps = {
  fetchTeacherListSections,
  fetchTeacherCourse,
  resetState,
  resetTeacherCourseState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ListSectionsProps = RouterProps & ConnectedProps<typeof connector>;

const ListSections = ({
  history,
  fetchTeacherListSections,
  fetchTeacherCourse,
  listSections,
  course,
  isFetchingListCourses,
  resetState,
  resetTeacherCourseState,
  accessToken,
  user,
}: ListSectionsProps) => {
  const [links, setLinks] = useState<Array<NavBarLink>>([{
    name: 'Teacher',
    url: paths.teacher,
  }, {
    name: 'Edit sections',
    url: history.location.pathname,
  }]);

  const [searchPattern, changeSearchPattern] = useState('');
  const [openAddSection, setOpenAddSection] = useState(false);

  useEffect(() => {
    if (accessToken) {
      const courseId = history.location.pathname.split('/')[2];
      fetchTeacherCourse(courseId);
      fetchTeacherListSections(courseId);
    }

    return () => {
      resetState();
      resetTeacherCourseState();
    };
  }, [history.location.pathname, accessToken]);

  useEffect(() => {
    if (course) {
      setLinks([{
        name: 'Teacher',
        url: paths.teacher,
      }, {
        name: `Edit ${course.title}'s sections`,
        url: history.location.pathname,
      }]);
    }
  }, [course]);

  useEffect(() => {
    if (!accessToken || !user || user.accountType === 'Student') {
      history.push(paths.base);
    }
  }, [accessToken, user]);

  useEffect(() => {
    setOpenAddSection(false);
  }, [listSections]);

  return (
    <PageWrapper history={history} links={links}>
    {
      isFetchingListCourses &&
      <div style={{ width: '150px', margin: 'auto' }}>
        <img src={loading} alt="Loading..." />
      </div>
    }
    {
      !isFetchingListCourses &&
      <div className="TeacherListSections">
        <div className="TeacherListSections__header">
          <TextField
            variant="outlined"
            label="Search your sections by name"
            className="TeacherListSections__search-sections"
            value={searchPattern}
            onChange={(e) => changeSearchPattern(e.target.value)}
          />
          <Button
            className="TeacherListSections__add-section"
            variant="contained"
            onClick={() => setOpenAddSection(true)}
          >
            Add section
          </Button>
        </div>
      {
        course && Array.isArray(listSections) && listSections.map((section) => {
          if (section.sectionName.toLowerCase().includes(searchPattern.toLowerCase())) {
            return (
              <Section history={history} key={section._id} section={section} courseId={course._id} />
            );
          }
          return null;
        })
      }
      </div>
    }
    {
      openAddSection && course &&
      <AddEditSectionModal
        open={openAddSection}
        onClose={() => setOpenAddSection(false)}
        sectionId=""
        courseId={course._id}
      />
    }
    </PageWrapper>
  );
};

export default withRouter(connector(ListSections));