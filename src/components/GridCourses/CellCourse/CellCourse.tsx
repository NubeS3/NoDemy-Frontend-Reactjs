import { Button, Paper, Typography } from "@material-ui/core";
import CourseBasicInfoProps from "../../../types/CourseBasicInfoProps.type";

import '../../../styles/components/GridCourses/CellCourse/CellCourse.scss';

type CellCourseProps = {
  course: CourseBasicInfoProps;
  buttonText: string;
  callback: (courseId: string) => void;
};

const CellCourse = ({ course, buttonText, callback }: CellCourseProps) => {
  return (
    <Paper className="CellCourse">
      <div className="CellCourse__cover-wrapper">
        <img src={course.coverImage} alt="Cover" />
      </div>
      <div style={{ padding: '10px' }}>
        <Typography className="CellCourse__title" variant="h6">{course.title}</Typography>
        <Typography className="CellCourse__tutor" variant="h6">{course.tutor.fullname}</Typography>

        <Button className="CellCourse__button" onClick={() => callback(course._id)}>{buttonText}</Button>
      </div>
    </Paper>
  )
};

export default CellCourse;