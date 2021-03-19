import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import paths from '../../configs/paths.config';
import '../../styles/components/CourseBasic/CourseBasicPortrait.scss';
import CourseBasicInfoProps from '../../types/CourseBasicInfoProps.type';
import Tag from '../Tag';

type CourseBasicPortraitProps = {
  course: CourseBasicInfoProps;
}

const CourseBasicPortrait = ({ course }: CourseBasicPortraitProps) => {
  const [goToCourseDetails, setGoToCourseDetails] = useState(false);

  if (goToCourseDetails) {
    return <Redirect push to={paths.courseDetails(course._id)} />
  }

  return (
    <Card
      className={`CourseBasicPortrait`}
      title={course.title}
      onClick={() => setGoToCourseDetails(true)}
    >
      <CardActionArea>
        <CardMedia
          className={`CourseBasicPortrait__media`}
          title={course.title}
          image={course.coverImage}
        />

        <CardContent>
          <Typography
            variant="body2"
            className="CourseBasicPortrait__title"
            component="p"
            gutterBottom
          >
            {course.title}
          </Typography>

          <Typography
            variant="body2"
            component="p"
            className="CourseBasicPortrait__author"
          >
            {course.tutor.fullname}
          </Typography>

          <Tag tagName={course.categoryName} fontSize="xxxs" />

          <div className={`CourseBasicPortrait__rating`}>
            <p className={`CourseBasicPortrait__rating__star-number`}>{course.averageRatings}</p>

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
  
            <p className={`CourseBasicPortrait__rating__total-rating`}>({course.totalRatings} ratings)</p>
          </div>

          {
            !course.isBought &&
            <div className={`CourseBasicPortrait__price`}>
              <p className={`CourseBasicPortrait__price__current-price`}>
                ${course.sale.toFixed(2)}
              </p>
              &nbsp; &nbsp;
              {
                course.sale !== course.price &&
                <p className={`CourseBasicPortrait__price__original-price`}>${course.price}</p>
              }
            </div>
          }

          {
            course.isBought &&
            <div className="CourseBasicPortrait__price">
              <Typography variant="body2" component="i">Already purchased</Typography>
            </div>
          }

          {
            course.isBestseller &&
            <>
              <Tag
                tagName="Bestseller"
                backgroundColor="#ffe799"
                color="black"
                fontSize="xxxs"
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
            />
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseBasicPortrait;
