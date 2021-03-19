import {Card, CardActionArea, CardContent, Typography} from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import paths from "../../configs/paths.config";

import '../../styles/components/CourseBasic/CourseBasicLandscape.scss';
import CourseBasicInfoProps from "../../types/CourseBasicInfoProps.type";
import Tag from "../Tag";

type CourseBasicLandscapeProps = {
  course: CourseBasicInfoProps;
}

const CourseBasicLandscape = ({ course }: CourseBasicLandscapeProps) => {
  const [goToCourseDetails, setGoToCourseDetails] = useState(false);

  if (goToCourseDetails) {
    return <Redirect push to={paths.courseDetails(course._id)} />
  }

  return (
    <Card
      title={course.title}
      className={`CourseBasicLandscape`}
      onClick={() => setGoToCourseDetails(true)}
    >
      <CardActionArea className={`CourseBasicLandscape`}>
        <div
          className={`CourseBasicLandscape__media`}
        >
          <img
            className={`CourseBasicLandscape__media__img`}
            alt="Course cover"
            src={course.coverImage}
          />
        </div>  
        <CardContent className={`CourseBasicLandscape__content`}>
          <Typography
            variant="body2"
            className="CourseBasicLandscape__content__title"
            component="p"
            gutterBottom
          >
            {course.title}
          </Typography>
          
          <Typography
            variant="body2"
            component="p"
            className="CourseBasicLandscape__content__author"
          >
            {course.tutor.fullname}
          </Typography>

          <Tag fontSize="xxxs" tagName={course.categoryName} margin="small" /> &nbsp; &nbsp;

          {
            course.isBestseller &&
            <>
              <Tag
                tagName="Bestseller"
                backgroundColor="#ffe799"
                color="black"
                fontSize="xxxs"
                margin="small"
              />
              &nbsp; &nbsp;
            </>
          }
          
          {
            course.isNew &&
            <>
              <Tag
                tagName="New course"
                backgroundColor="#ffe799"
                color="black"
                fontSize="xxxs"
                margin="small"
              />
              &nbsp; &nbsp;
            </>
          }

          {
            course.isHot &&
            <Tag
              tagName="Hot"
              backgroundColor="#ffe799"
              color="black"
              fontSize="xxxs"
              margin="small"
            />
          }

          <div className={`CourseBasicLandscape__rating`}>
            <p className={`CourseBasicLandscape__rating__star-number`}>{course.averageRatings}</p>

            <>
            {
              course.averageRatings < 1 && course.averageRatings >= 0.5 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star-half" />
            }
            {
              course.averageRatings < 0.5 &&
              <i className="CourseBasicPortrait__rating__star far fa-star" />
            }
            {
              course.averageRatings >= 1 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star" />
            }

            {
              course.averageRatings < 2 && course.averageRatings >= 1.5 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star-half" />
            }
            {
              course.averageRatings < 1.5 &&
              <i className="CourseBasicPortrait__rating__star far fa-star" />
            }
            {
              course.averageRatings >= 2 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star" />
            }

            {
              course.averageRatings < 3 && course.averageRatings >= 2.5 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star-half" />
            }
            {
              course.averageRatings < 2.5 &&
              <i className="CourseBasicPortrait__rating__star far fa-star" />
            }
            {
              course.averageRatings >= 3 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star" />
            }

            {
              course.averageRatings < 4 && course.averageRatings >= 3.5 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star-half" />
            }
            {
              course.averageRatings < 3.5 &&
              <i className="CourseBasicPortrait__rating__star far fa-star" />
            }
            {
              course.averageRatings >= 4 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star" />
            }

            {
              course.averageRatings < 5 && course.averageRatings >= 4.5 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star-half" />
            }
            {
              course.averageRatings < 4.5 &&
              <i className="CourseBasicPortrait__rating__star far fa-star" />
            }
            {
              course.averageRatings === 5 &&
              <i className="CourseBasicPortrait__rating__star fas fa-star" />
            }
            </>
  
            <p className={`CourseBasicLandscape__rating__total-rating`}>({course.totalRatings} ratings)</p>
          </div>

          {
            !course.isBought &&
            <div className={`CourseBasicLandscape__price`}>
              <p className={`CourseBasicLandscape__price__current-price`}>
                ${course.sale.toFixed(2)}
              </p>
              &nbsp; &nbsp;
              {
                course.sale !== course.price &&
                <p className={`CourseBasicLandscape__price__original-price`}>${course.price}</p>
              }
            </div>
          }

          {
            course.isBought &&
            <div className="CourseBasicLandscape__price">
              <Typography variant="body2" component="i">Already purchased</Typography>
            </div>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  )
};

export default CourseBasicLandscape;
