import { AppBar, Button, Divider, Modal, Toolbar, Typography } from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";

import '../../../styles/components/Teacher/RemoveCourseModal/RemoveCourseModal.scss';
import CourseBasicInfoProps from "../../../types/CourseBasicInfoProps.type";

import { deleteCourse } from '../../../reducers/teacherCourses.reducer';

const mapDispatchToProps = {
  deleteCourse,
};

const connector = connect(undefined, mapDispatchToProps);

type RemoveCourseModalProps = ConnectedProps<typeof connector> & {
  open: boolean;
  onClose: () => void;
  course: CourseBasicInfoProps;
};

const RemoveCourseModal = ({ open, onClose, course, deleteCourse }: RemoveCourseModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="RemoveCourseModal">
        <AppBar position="static" className="RemoveCourseModal__app-bar">
          <Toolbar>
            <Typography variant="h6">Remove course {course.title}</Typography>
          </Toolbar>
        </AppBar>
        <div className="RemoveCourseModal__body">
          <Typography variant="body2">This action can not be undone. Please be careful!</Typography>
        </div>
        <Divider />
        <div className="RemoveCourseModal__footer">
          <Button
            variant="contained"
            color="secondary"
            className="RemoveCourseModal__button RemoveCourseModal__button--cancel"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="RemoveCourseModal__button"
            onClick={() => deleteCourse(course._id)}
          >
            Remove course
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default connector(RemoveCourseModal);