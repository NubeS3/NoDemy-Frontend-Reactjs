import { Button, Grid, Typography } from "@material-ui/core";

import CourseBasicInfoProps from "../../../../types/CourseBasicInfoProps.type";

import '../../../../styles/components/Teacher/ListCourses/Course/Course.scss';
import Tag from "../../../Tag";
import HistoryProps from "../../../../types/HistoryProps.type";
import RemoveCourseModal from "../../RemoveCourseModal/RemoveCourseModal";
import { useState } from "react";

type CourseProps = HistoryProps & {
  course: CourseBasicInfoProps;
};

const Course = ({ course, history }: CourseProps) => {
  const [openRemoveCourse, setOpenRemoveCourse] = useState(false);

  return (
    <div className="TeacherCourse">
      <Grid container>
        <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <img className="TeacherCourse__cover" src={course.coverImage} alt="Course's cover" />
        </Grid>
        <Grid item xs={12} md={8} className="TeacherCourse__right">
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6">{course.title}</Typography>
            <Tag tagName={course.categoryName} fontSize="xxxs" />
            <div className="TeacherCourse__price">
              <Typography style={{ fontSize: '18px', fontWeight: 600 }}>${course.sale.toFixed(2)}</Typography> &nbsp;&nbsp;
              {
                course.sale !== course.price &&
                <Typography style={{ textDecoration: 'line-through' }}>${course.price}</Typography>
              }
            </div>
            <Typography>Last updated at: {(new Date(course.updatedAt)).toLocaleDateString()}</Typography>
          </div>
          <div className="TeacherCourse__actions">
            <Button
              title="Edit course's basic info"
              className="TeacherCourse__actions__buttons"
              style={{ color: 'green' }}
              onClick={() => history.push(`/edit-course/${course._id}`)}
            >
              <i className="fas fa-edit" />
            </Button>
            <Button
              title="Add or Edit lectures"
              className="TeacherCourse__actions__buttons"
              style={{ color: 'green' }}
              onClick={() => history.push(`/edit-sections/${course._id}`)}
            >
              <i className="fas fa-chalkboard-teacher" />
            </Button>
            <Button
              title="Remove course"
              className="TeacherCourse__actions__buttons"
              style={{ color: 'red' }}
              onClick={() => setOpenRemoveCourse(true)}
            >
              <i className="fas fa-trash" />
            </Button>
          </div>
        </Grid>
      </Grid>
      <RemoveCourseModal open={openRemoveCourse} onClose={() => setOpenRemoveCourse(false)} course={course} />
    </div>
  );
};

export default Course;