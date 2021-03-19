import LectureType from '../../../../types/Lecture.type';

import '../../../../styles/components/Teacher/ListLectures/Lecture/Lecture.scss';
import { Button, Grid, Typography } from '@material-ui/core';
import useWindowDimensions from '../../../../utils/useWindowDimensions.util';
import { useState } from 'react';
import VideoPreviewModal from '../../../Lectures/Lecture/VideoPreviewModal';
import { connect, ConnectedProps } from 'react-redux';
import { deleteLecture } from '../../../../reducers/teacherLectures.reducer';
import AddLectureModal from '../../AddLectureModal/AddLectureModal';

const mapDispatchToProps = {
  deleteLecture,
};

const connector = connect(undefined, mapDispatchToProps);

type LectureProps = ConnectedProps<typeof connector> & {
  lecture: LectureType;
};

const Lecture = ({ lecture, deleteLecture }: LectureProps) => {
  const { width } = useWindowDimensions();

  const [openPreview, setOpenPreview] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleDeleteLecture = () => {
    if (window.confirm(`Are you sure you want to delete lecture ${lecture.lectureName}? This action can not be undone!`)) {
      deleteLecture(lecture._id);
    }
  };

  return (
    <div className="TeacherLecture">
      <Grid container justify="space-between">
        <Grid item xs={12} md={8}>
          <Typography variant="h6">{lecture.lectureName}</Typography>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: width >= 960 ? 'right' : 'center' }}>
          <Button
            className="TeacherLecture__actions__buttons"
            title="Preview uploaded video"
            style={{ color: 'green' }}
            onClick={() => setOpenPreview(true)}
          >
            <i className="fas fa-eye" />
          </Button>
          <Button
            className="TeacherLecture__actions__buttons"
            title="Edit lecture"
            style={{ color: 'green' }}
            onClick={() => setOpenUpdate(true)}
          >
            <i className="fas fa-edit" />
          </Button>
          <Button
            className="TeacherLecture__actions__buttons"
            title="Remove lecture"
            style={{ color: 'red' }}
            onClick={handleDeleteLecture}
          >
            <i className="fas fa-trash" />
          </Button>
        </Grid>
      </Grid>

      {
        openUpdate &&
        <AddLectureModal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          lectureId={lecture._id}
          sectionId={lecture.sectionId}
        />
      }
      
      {
        openPreview &&
        <VideoPreviewModal
          open={openPreview}
          onClose={() => setOpenPreview(false)}
          lecture={lecture}
        />
      }
    </div>
  );
};

export default connector(Lecture);