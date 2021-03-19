/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../reducers/root.reducer";
import { fetchListRatings, clearListRatings } from '../../reducers/ratings.reducer';
import Rating from "./Rating/Rating";

import loading from '../../assets/loadings/medium.loading.gif';
import { Pagination } from "@material-ui/lab";
import { Grid, Typography } from "@material-ui/core";

const mapStateToProps = (state: RootState) => ({
  course: state.courseReducer.course,
  listRatings: state.ratingsReducer.listRatings,
  totalRatings: state.ratingsReducer.totalRatings,
  totalPages: state.ratingsReducer.totalPages,
  isFetchingListRatings: state.ratingsReducer.isFetchingListRatings,
});

const mapDispatchToProps = {
  clearListRatings,
  fetchListRatings,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type RatingsProps = ConnectedProps<typeof connector>;

const Ratings = ({
  course,
  listRatings,
  totalPages,
  clearListRatings,
  fetchListRatings,
  isFetchingListRatings,
}: RatingsProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (course && course._id) {
      fetchListRatings(page);
    }

    return () => {
      clearListRatings();
    };
  }, [course, page]);

  return (
    <div>
      <div>
        {
          isFetchingListRatings &&
          <div style={{ width: '150px', margin: 'auto' }}>
            <img src={loading} alt="Loading..." />
          </div>
        }
        {
          !isFetchingListRatings && Array.isArray(listRatings) && listRatings.length === 0 &&
          <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
            <Typography variant="h6" style={{ fontWeight: 400 }}>There is no rating for this course.</Typography>
          </div>
        }
        {
          !isFetchingListRatings && Array.isArray(listRatings) && listRatings.map((rating, index) => (
            <Rating key={rating._id} rating={rating} last={index === listRatings.length - 1} />
          ))
        }
      </div>
      {
        !isFetchingListRatings && totalPages > 0 &&
        <div style={{ paddingBottom: '15px' }}>
          <Grid container justify="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
            />
          </Grid>
        </div>
      }
    </div>
  );
};

export default connector(Ratings);