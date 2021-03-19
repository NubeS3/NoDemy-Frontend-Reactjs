import { Grid, IconButton } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useState } from 'react';
import { widthScreens } from '../../configs/sizes.config';
import '../../styles/components/Home/CoursesSlider.scss';
import CourseBasicInfoProps from '../../types/CourseBasicInfoProps.type';
import useWindowDimensions from '../../utils/useWindowDimensions.util';
import CourseBasic from '../CourseBasic/CourseBasic';

type CoursesSliderProps = {
  courses: Array<CourseBasicInfoProps>;
};

const CoursesSlider = ({ courses }: CoursesSliderProps) => {
  const { width } = useWindowDimensions();

  let step = 0;
  if (width <= widthScreens.m) {
    step = 0;
  }
  else if (width <= widthScreens.l) {
    step = 2;
  }
  else if (width <= widthScreens.xl) {
    step = 3;
  }
  else {
    step = 4;
  }

  if (courses.length - 1 < step) {
    step = courses.length - 1;
  }

  const [range, setRange] = useState({
    start: 0,
    end: step,
  })

  const slideLeft = () => {
    console.log('here');

    setRange((prev) => {
      if (prev.start - 1 >= 0) {
        return {
          start: prev.start - 1,
          end: prev.end - 1,
        };
      }
      return {
        start: courses.length - 1 - step,
        end: courses.length - 1,
      };
    });
  };

  const slideRight = () => {
    setRange((prev) => {
      if (prev.end + 1 <= courses.length - 1) {
        return {
          start: prev.start + 1,
          end: prev.end + 1,
        };
      }

      return {
        start: 0,
        end: step,
      };
    });
  };

  return (
    <div className="CoursesSlider">
      <div className="CoursesSlider__buttons">
        <IconButton
          edge="start"
          color="inherit"
          className="CoursesSlider__buttons__button CoursesSlider__buttons__button--left"
          size={width > widthScreens.s ? "medium" : "small"}
          onClick={slideLeft}
        >
          <KeyboardArrowLeftIcon style={{ color: '#e73e3e' }} />
        </IconButton>
      </div>

      <Grid container justify={width <= widthScreens.m ? "center" : "space-between"} spacing={3}>
      {
        courses.map((course, index) => {
          if (index >= range.start && index <= range.end) {
            return (
              <Grid item key={course._id}>
                <CourseBasic type="portrait" course={course} />
              </Grid>
            )
          }
          return null
        })
      }
      </Grid>

      <div className="CoursesSlider__buttons">
        <IconButton
          edge="end"
          color="inherit"
          className="CoursesSlider__buttons__button CoursesSlider__buttons__button--right"
          size={width > widthScreens.s ? "medium" : "small"}
          onClick={slideRight}
        >
          <KeyboardArrowRightIcon style={{ color: '#e73e3e' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default CoursesSlider;
