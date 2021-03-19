import { connect, ConnectedProps } from "react-redux";
import { Button, Grid, Typography } from "@material-ui/core";

import { RootState } from "../../../reducers/root.reducer";
import HistoryProps from "../../../types/HistoryProps.type";
import { addCourseToCart, removeCourseFromCart, buyCourse } from '../../../reducers/course.reducer';

import '../../../styles/components/CourseDetails/CourseDetailsMobile/CourseDetailsHeaderMobile.scss';

import Tag from "../../Tag";
import paths from "../../../configs/paths.config";
import endpoints from "../../../configs/endpoints.config";

const mapStateToProps = (state: RootState) => ({
  course: state.courseReducer.course,
  accessToken: state.authenticationReducer.accessToken,
});

const mapDispatchToProps = {
  addCourseToCart,
  removeCourseFromCart,
  buyCourse,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CourseDetailsHeaderMobileProps = ConnectedProps<typeof connector> & HistoryProps;

const CourseDetailsHeaderMobile = ({
  history,
  course,
  addCourseToCart,
  removeCourseFromCart,
  buyCourse,
  accessToken,
}: CourseDetailsHeaderMobileProps) => {
  const handleBuyCourse = () => {
    if (accessToken) {
      return buyCourse();
    }

    history.push(paths.login);
  };

  return (
    <div className="CourseDetailsHeaderMobile">
      <div className="CourseDetailsHeaderMobile__course-basic-info">
        <Typography variant="h3" className="title CourseDetailsHeaderMobile__title">{course.title}</Typography>
        <Typography variant="body2" className="CourseDetailsHeaderMobile__summary">{course.summary}</Typography>
        <div className="CourseDetailsHeaderMobile__tags">
          <Tag
            fontSize="xxxs"
            tagName={course.categoryName}
            margin="small"
            fontWeight="medium"
          /> &nbsp; &nbsp;

          {
            course.isBestseller &&
            <>
              <Tag
                tagName="Bestseller"
                backgroundColor="#ffe799"
                color="black"
                fontSize="xxxs"
                margin="medium"
                fontWeight="medium"
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
                margin="medium"
                fontWeight="medium"
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
              margin="medium"
              fontWeight="medium"
            />
          }
        </div>
        <div className="CourseDetailsHeaderMobile__ratings">
          <p className={`CourseDetailsHeaderMobile__average-ratings`}>{course.averageRatings}</p>

          <>
            {
              course.averageRatings < 1 && course.averageRatings >= 0.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star-half" />
            }
            {
              course.averageRatings < 0.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star far fa-star" />
            }
            {
              course.averageRatings >= 1 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star" />
            }

            {
              course.averageRatings < 2 && course.averageRatings >= 1.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star-half" />
            }
            {
              course.averageRatings < 1.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star far fa-star" />
            }
            {
              course.averageRatings >= 2 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star" />
            }

            {
              course.averageRatings < 3 && course.averageRatings >= 2.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star-half" />
            }
            {
              course.averageRatings < 2.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star far fa-star" />
            }
            {
              course.averageRatings >= 3 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star" />
            }

            {
              course.averageRatings < 4 && course.averageRatings >= 3.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star-half" />
            }
            {
              course.averageRatings < 3.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star far fa-star" />
            }
            {
              course.averageRatings >= 4 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star" />
            }

            {
              course.averageRatings < 5 && course.averageRatings >= 4.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star-half" />
            }
            {
              course.averageRatings < 4.5 &&
              <i className="CourseDetailsHeaderMobile__rating-star far fa-star" />
            }
            {
              course.averageRatings === 5 &&
              <i className="CourseDetailsHeaderMobile__rating-star fas fa-star" />
            }
          </>

          <p className={`CourseDetailsHeaderMobile__total-ratings`}>({course.totalRatings} ratings)</p>

          <p className={`CourseDetailsHeaderMobile__total-registered`}>{course.totalRegistered} students</p>
        </div>
        <Typography variant="body2" style={{ margin: '12px 0' }}>Created by {course.tutor.fullname}</Typography>
        <Typography variant="body2" style={{ margin: '8px 0' }}>Last updated: {(new Date(course.updatedAt).toLocaleDateString())}</Typography>
          
        <div className="CourseDetailsHeaderMobile__cover-wrapper">
          <img src={course.coverImage} alt="Course's cover" />
        </div>
      </div>
      <div className="CourseDetailsHeaderMobile__course-actions">
      {
        course.isBought &&
        <Button
          variant="contained"
          className="CourseDetailsHeaderMobile__buttons"
          onClick={() => history.push(`${paths.courseDetails(course._id)}/learn`)}
        >
          Go to course
        </Button>
      }
      {
        !course.isBought &&
        <>
          <div className="CourseDetailsHeaderMobile__price">
            <Typography
              variant="h5"
              className="CourseDetailsHeaderMobile__price__sale"
            >
              ${course.sale.toFixed(2)}
            </Typography>

            {
              course.saleRatio !== 0 &&
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p
                  className="CourseDetailsHeaderMobile__price__original-price"
                >
                  ${course.price}
                </p>
              </div>
            }

            {
              course.saleRatio !== 0 &&
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p
                  className="CourseDetailsHeaderMobile__price__original-price CourseDetailsHeaderMobile__price__original-price--ratio"
                >
                  {course.saleRatio}% off
                </p>
              </div>
            }
          </div>
          <Button
            variant="contained"
            className="CourseDetailsHeaderMobile__buttons"
            style={{ marginBottom: '5px' }}
            onClick={handleBuyCourse}
          >
            Buy now
          </Button>
          <Grid container justify="space-between" spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                className="CourseDetailsHeaderMobile__buttons CourseDetailsHeaderMobile__buttons--secondary"
                onClick={course.isInCart ? removeCourseFromCart : addCourseToCart}
              >
                { course.isInCart ? 'Remove from cart' : 'Add to cart' }
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" className="CourseDetailsHeaderMobile__buttons CourseDetailsHeaderMobile__buttons--secondary">
                Add to wishlist
              </Button>
            </Grid>
          </Grid>
        </>
      }
      </div>
      <div className="CourseDetailsHeaderMobile__course-author" style={{ textAlign: 'center' }}>
        <div style={{ textAlign: 'center' }} className="CourseDetailsHeaderMobile__avatar">
          <img src={`${endpoints.base}/users/${course.tutor._id}/avatar`} alt="Tutor's avatar" />
        </div>
        <Typography variant="h6">{course.tutor.fullname}</Typography>
        <Typography variant="body1">{course.tutor.email}</Typography>
      </div>
    </div>
  );
};

export default connector(CourseDetailsHeaderMobile);