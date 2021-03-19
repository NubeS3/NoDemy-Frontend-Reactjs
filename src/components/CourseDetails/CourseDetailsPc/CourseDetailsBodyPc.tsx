import { AppBar, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../reducers/root.reducer';
import '../../../styles/components/CourseDetails/CourseDetailsPc/CourseDetailsBodyPc.scss';
import EditRating from '../../Ratings/Rating/EditRating';
import Ratings from '../../Ratings/Ratings';
import CourseDetailsDescriptionPc from './CourseDetailsDescriptionPc';
import CourseDetailsSyllabusPc from './CourseDetailsSyllabusPc';

const mapStateToProps = (state: RootState) => ({
  course: state.courseReducer.course,
});

const connector = connect(mapStateToProps);

type CourseDetailsBodyPcProps = ConnectedProps<typeof connector>;

const CourseDetailsBodyPc = ({ course }: CourseDetailsBodyPcProps) => {
  const [tab, setTab] = useState('description');

  return (
    <div className="CourseDetailsBodyPc">
      <AppBar position="static">
        <Tabs
          className="CourseDetailsBodyPc__tabs"
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="Course details tabs"
          value={tab}
          onChange={(_, newValue: string) => setTab(newValue)}
        >
          <Tab label="Description" value="description" className="CourseDetailsBodyPc__tab" />
          <Tab label="Syllabus" value="syllabus" className="CourseDetailsBodyPc__tab" />
          <Tab label="Ratings" value="ratings" className="CourseDetailsBodyPc__tab" />
        </Tabs>
      </AppBar>
      {
        tab === 'description' &&
        <CourseDetailsDescriptionPc description={course.description} />
      }
      {
        tab === 'syllabus' &&
        <CourseDetailsSyllabusPc />
      }
      {
        tab === 'ratings' &&
        <div style={{
          boxShadow: '0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
        }}>
          {
            course.isBought && <EditRating />
          }
          <Ratings />
        </div>
      }
    </div>
  );
};

export default connector(CourseDetailsBodyPc);
