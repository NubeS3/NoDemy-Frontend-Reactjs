/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../reducers/root.reducer';

import '../../../styles/components/Teacher/ListLectures/ListLectures.scss';
import loading from '../../../assets/loadings/medium.loading.gif';

import RouterProps from '../../../types/RouterProps.type';

import { fetchTeacherListLectures, resetListLecturesState } from '../../../reducers/teacherLectures.reducer';
import { NavBarLink } from '../../common/NavBar';
import paths from '../../../configs/paths.config';
import PageWrapper from '../../common/PageWrapper';
import { Button, TextField } from '@material-ui/core';
import Lecture from './Lecture/Lecture';
import AddLectureModal from '../AddLectureModal/AddLectureModal';

const mapStateToProps = (state: RootState) => ({
  listLectures: state.teacherLectures.listLectures,
  isFetchingListLectures: state.teacherLectures.isFetchingListLectures,
});

const mapDispatchToProps = {
  fetchTeacherListLectures,
  resetListLecturesState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ListLecturesProps = RouterProps & ConnectedProps<typeof connector>;

const ListLectures = ({
  history,
  listLectures,
  isFetchingListLectures,
  fetchTeacherListLectures,
  resetListLecturesState,
}: ListLecturesProps) => {
  const links: Array<NavBarLink> = [{
    name: 'Home',
    url: paths.base,
  }, {
    name: 'Edit list lectures',
    url: history.location.pathname,
  }];

  const [searchPattern, changeSearchPattern] = useState('');
  const [openAddLecture, setOpenAddLecture] = useState(false);

  useEffect(() => {
    const sectionId = history.location.pathname.split('/')[2];
    fetchTeacherListLectures(sectionId);
    return () => {
      resetListLecturesState();
    };
  }, [history.location.pathname]);

  useEffect(() => {
    setOpenAddLecture(false);
  }, [listLectures]);

  return (
    <PageWrapper history={history} links={links}>
    {
      isFetchingListLectures &&
      <div style={{ width: '150px', margin: 'auto' }}>
        <img src={loading} alt="Loading" />
      </div>
    }

    {
      !isFetchingListLectures &&
      <div className="TeacherListLectures">
        <div className="TeacherListLectures__header">
          <TextField
            variant="outlined"
            label="Search your lectures by name"
            className="TeacherListLectures__search-lectures"
            value={searchPattern}
            onChange={(e) => changeSearchPattern(e.target.value)}
          />
          <Button
            className="TeacherListLectures__add-lecture"
            variant="contained"
            onClick={() => setOpenAddLecture(true)}
          >
            Add lecture
          </Button>
        </div>
      {
        listLectures && Array.isArray(listLectures) && listLectures.map((lecture) => {
          if (lecture.lectureName.toLowerCase().includes(searchPattern.toLowerCase())) {
            return <Lecture lecture={lecture} key={lecture._id} />
          }
          return null;
        })
      }
      </div>
    }
    {
      openAddLecture &&
      <AddLectureModal
        open={openAddLecture}
        onClose={() => setOpenAddLecture(false)}
        sectionId={history.location.pathname.split('/')[2]}
        lectureId=""
      />
    }
    </PageWrapper>
  );
};

export default withRouter(connector(ListLectures));