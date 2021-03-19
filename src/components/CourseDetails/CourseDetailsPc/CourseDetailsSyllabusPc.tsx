/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { fetchSections, fetchLectures } from '../../../reducers/course.reducer';
import { RootState } from '../../../reducers/root.reducer';

import loading from '../../../assets/loadings/medium.loading.gif';
import '../../../styles/components/CourseDetails/CourseDetailsPc/CourseDetailsSyllabusPc.scss';
import SectionsPreview from '../../Sections/SectionsPreview';

const mapStateToProps = (state: RootState) => ({
  sections: state.courseReducer.sections,
  isFetchingSections: state.courseReducer.isFetchingSections,
});

const mapDispatchToProps = {
  fetchSections,
  fetchLectures,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CourseDetailsSyllabusPcProps = ConnectedProps<typeof connector>;

const CourseDetailsSyllabusPc = ({
  sections,
  fetchSections,
  isFetchingSections,
  fetchLectures,
}: CourseDetailsSyllabusPcProps) => {
  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    sections.forEach((_, index) => {
      fetchLectures(index);
    })
  }, [sections]);

  return (
    <div className="CourseDetailsSyllabusPc">
    {
      isFetchingSections &&
      <div style={{ width: 150, margin: 'auto' }}>
        <img src={loading} alt="Loading..." />
      </div>
    }
    {
      !isFetchingSections && <SectionsPreview />
    }
    </div>
  );
};

export default connector(CourseDetailsSyllabusPc);
