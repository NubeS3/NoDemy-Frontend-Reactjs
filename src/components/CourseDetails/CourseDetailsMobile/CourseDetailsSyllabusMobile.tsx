/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { fetchSections, fetchLectures } from '../../../reducers/course.reducer';
import { RootState } from "../../../reducers/root.reducer";

import loading from '../../../assets/loadings/medium.loading.gif';
import SectionsPreview from "../../Sections/SectionsPreview";

const mapStateToProps = (state: RootState) => ({
  sections: state.courseReducer.sections,
  isFetchingSections: state.courseReducer.isFetchingSections,
});

const mapDispatchToProps = {
  fetchSections,
  fetchLectures,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CourseDetailsSyllabusMobileProps = ConnectedProps<typeof connector>;

const CourseDetailsSyllabusMobile = ({
  sections,
  isFetchingSections,
  fetchLectures,
  fetchSections,
}: CourseDetailsSyllabusMobileProps) => {
  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    sections.forEach((_, index) => {
      fetchLectures(index);
    })
  }, [sections]);

  return (
    <div className="CourseDetailsSyllabusMobile">
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

export default connector(CourseDetailsSyllabusMobile);