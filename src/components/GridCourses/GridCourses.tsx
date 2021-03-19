import { GridList, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

import '../../styles/components/GridCourses/GridCourses.scss';
import CourseBasicInfoProps from "../../types/CourseBasicInfoProps.type";

import useWindowDimensions from "../../utils/useWindowDimensions.util";
import CellCourse from "./CellCourse/CellCourse";

type GridCoursesProps = {
  listCourses: Array<CourseBasicInfoProps>;
  buttonText: string;
  callback: (courseId: string) => void;
  title: string;
};

const GridCourses = ({ listCourses, buttonText, callback, title }: GridCoursesProps) => {
  const { width } = useWindowDimensions();
  let cols = 1;
  if (width < 421) {
    cols = 1;
  }
  if (width < 801) {
    cols = 2;
  }
  else if (width < 1500) {
    cols = 3;
  }
  else {
    cols = 4;
  }

  const [searchPattern, changeSearchPattern] = useState('');

  return (
    <div className="GridList">
      <Typography variant="h4" style={{ marginTop: '20px', marginLeft: '20px' }}>{title}</Typography>
      <TextField
        variant="outlined"
        label="Search courses by name"
        style={{ marginTop: '20px', marginLeft: '20px', marginBottom: '20px', width: '300px' }}
        value={searchPattern}
        onChange={(e) => changeSearchPattern(e.target.value)}
      />
      <div className="GridList__wrapper">
        <GridList cellHeight={320} className="GridList__grid" cols={cols}>
        {
          listCourses.map((course) => {
            if (course.title.toLowerCase().includes(searchPattern.toLowerCase())) {
              return (
                <CellCourse buttonText={buttonText} callback={callback} course={course} key={course._id} />
              );
            }
            return null;
          })
        }
        </GridList>
      </div>
    </div>
  );
};

export default GridCourses;