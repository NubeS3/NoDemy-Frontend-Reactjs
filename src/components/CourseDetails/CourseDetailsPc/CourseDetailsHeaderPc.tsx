import { Button, Typography } from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";

import '../../../styles/components/CourseDetails/CourseDetailsPc/CourseDetailsHeaderPc.scss';

import { RootState } from "../../../reducers/root.reducer";
import Tag from "../../Tag";
import endpoints from "../../../configs/endpoints.config";

import { addCourseToCart, removeCourseFromCart, buyCourse, addToWishlist, removeFromWishlist } from '../../../reducers/course.reducer';
import HistoryProps from "../../../types/HistoryProps.type";
import paths from "../../../configs/paths.config";

const mapStateToProps = (state: RootState) => ({
  course: state.courseReducer.course,
  accessToken: state.authenticationReducer.accessToken,
});

const mapDispatchToProps = {
  addCourseToCart,
  removeCourseFromCart,
  buyCourse,
  addToWishlist,
  removeFromWishlist,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CourseDetailsHeaderPcProps = ConnectedProps<typeof connector> & HistoryProps;

const CourseDetailsHeaderPc = ({
  course,
  addCourseToCart,
  removeCourseFromCart,
  buyCourse,
  accessToken,
  history,
  addToWishlist,
  removeFromWishlist
}: CourseDetailsHeaderPcProps) => {
  const handleBuyCourse = () => {
    if (accessToken) {
      return buyCourse();
    }

    history.push(paths.login);
  };

  return (
    <div className="CourseDetailsHeaderPc">
      <div className="CourseDetailsHeaderPc__sidebar">
        <img src={course.coverImage} alt="Course's cover" className="CourseDetailsHeaderPc__sidebar__cover" />
        <div className="CourseDetailsHeaderPc__sidebar__content">
          {
            !course.isBought &&
            <div className="CourseDetailsHeaderPc__price" style={{ justifyContent: course.saleRatio === 0 ? 'center' : 'flex-start' }}>
              <Typography
                variant="h5"
                className="CourseDetailsHeaderPc__price__sale"
              >
                ${course.sale.toFixed(2)}
              </Typography>

              {
                course.saleRatio !== 0 &&
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p
                    className="CourseDetailsHeaderPc__price__original-price"
                  >
                    ${course.price}
                  </p>
                </div>
              }

              {
                course.saleRatio !== 0 &&
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p
                    className="CourseDetailsHeaderPc__price__original-price CourseDetailsHeaderPc__price__original-price--ratio"
                  >
                    {course.saleRatio}% off
                  </p>
                </div>
              }
            </div>
          }

          {
            !course.isBought &&
            <div className="CourseDetailsHeaderPc__buy-cart">
              <Button
                variant="contained"
                color="primary"
                className="CourseDetailsHeaderPc__buy"
                onClick={handleBuyCourse}
              >
                <i className="fas fa-credit-card" /> &nbsp; Buy now
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="CourseDetailsHeaderPc__cart"
                onClick={course.isInCart ? removeCourseFromCart : addCourseToCart}
              >
                <i className="fas fa-shopping-cart" /> &nbsp; { course.isInCart ? 'Remove from cart' : 'Add to cart' }
              </Button>
            </div>
          }

          {
            course.isBought &&
            <Button
              variant="outlined"
              className="CourseDetailsHeaderPc__go-to-course"
              onClick={() => history.push(`${paths.courseDetails(course._id)}/learn`)}
            >
              <i className="fas fa-book-open"/> &nbsp; Go to course
            </Button>
          }

          <div className="CourseDetailsHeaderPc__author-info">
            <div className="CourseDetailsHeaderPc__author-avatar">
              <img src={`${endpoints.base}/users/${course.tutor._id}/avatar`} alt="Tutor's avatar" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography
                className="CourseDetailsHeaderPc__author-fullname-email CourseDetailsHeaderPc__fullname"
              >
                {course.tutor.fullname}
              </Typography>
              <Typography className="CourseDetailsHeaderPc__author-fullname-email">{course.tutor.email}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="CourseDetailsHeaderPc__wrapper">
        <div className="CourseDetailsHeaderPc__content">
          <div>
            <Typography variant="h4" className="CourseDetailsHeaderPc__title">{course.title}</Typography>

            <Typography>{course.summary}</Typography>

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

            <div className={`CourseDetailsHeaderPc__ratings-section`}>
              <p className={`CourseDetailsHeaderPc__average-ratings`}>{course.averageRatings}</p>

              <>
                {
                  course.averageRatings < 1 && course.averageRatings >= 0.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star-half" />
                }
                {
                  course.averageRatings < 0.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star far fa-star" />
                }
                {
                  course.averageRatings >= 1 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star" />
                }

                {
                  course.averageRatings < 2 && course.averageRatings >= 1.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star-half" />
                }
                {
                  course.averageRatings < 1.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star far fa-star" />
                }
                {
                  course.averageRatings >= 2 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star" />
                }

                {
                  course.averageRatings < 3 && course.averageRatings >= 2.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star-half" />
                }
                {
                  course.averageRatings < 2.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star far fa-star" />
                }
                {
                  course.averageRatings >= 3 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star" />
                }

                {
                  course.averageRatings < 4 && course.averageRatings >= 3.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star-half" />
                }
                {
                  course.averageRatings < 3.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star far fa-star" />
                }
                {
                  course.averageRatings >= 4 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star" />
                }

                {
                  course.averageRatings < 5 && course.averageRatings >= 4.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star-half" />
                }
                {
                  course.averageRatings < 4.5 &&
                  <i className="CourseDetailsHeaderPc__rating-star far fa-star" />
                }
                {
                  course.averageRatings === 5 &&
                  <i className="CourseDetailsHeaderPc__rating-star fas fa-star" />
                }
              </>

              <p className={`CourseDetailsHeaderPc__total-ratings`}>({course.totalRatings} ratings)</p>

              <p className={`CourseDetailsHeaderPc__total-registered`}>{course.totalRegistered} students</p>
            </div>

            <Typography variant="body2" style={{ marginBottom: '5px' }}>Created by {course.tutor.fullname}</Typography>
            <Typography variant="body2">Last updated: {(new Date(course.updatedAt).toLocaleDateString())}</Typography>
          </div>

        {
          !course.isInWishlist &&
          <button className="CourseDetailsHeaderPc__add-to-wishlist" onClick={() => addToWishlist()}>
            <i className="far fa-heart" /> &nbsp; Add to Wishlist
          </button>
        }
        {
          course.isInWishlist &&
          <button className="CourseDetailsHeaderPc__add-to-wishlist" onClick={() => removeFromWishlist()} style={{ width: '240px' }}>
            <i className="fas fa-heart" /> &nbsp; Remove from Wishlist
          </button>
        }
        </div>
        <div style={{ width: 480 }} />
      </div>
    </div>
  );
};

export default connector(CourseDetailsHeaderPc);
