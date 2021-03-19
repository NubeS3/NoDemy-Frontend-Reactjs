/* eslint-disable react-hooks/exhaustive-deps */
import { connect, ConnectedProps } from "react-redux";
import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

import { RootState } from "../../../reducers/root.reducer";
import { getOwnRating, resetRatingState, createOrUpdate } from '../../../reducers/rating.reducer';

import useWindowDimensions from "../../../utils/useWindowDimensions.util";

import loading from '../../../assets/loadings/small-secondary.loading.gif';

const mapStateToProps = (state: RootState) => ({
  rating: state.ratingReducer.rating,
  isFetchingRating: state.ratingReducer.isFetchingRating,
  isSubmittingRating: state.ratingReducer.isSubmittingRating,
});

const mapDispatchToProps = {
  getOwnRating,
  resetRatingState,
  createOrUpdate,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type EditRatingProps = ConnectedProps<typeof connector>;

const EditRating = ({
  rating,
  getOwnRating,
  resetRatingState,
  createOrUpdate,
  isSubmittingRating,
}: EditRatingProps) => {
  const {width} = useWindowDimensions();

  const [description, changeDescription] = useState('');
  const [ratingValue, changeRatingValue] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    getOwnRating();

    return () => {
      resetRatingState();
    }
  }, []);

  useEffect(() => {
    changeDescription(rating.description);
    changeRatingValue(rating.rating);
  }, [rating]);

  const submitRating = () => {
    setError('')

    if (ratingValue === 0) {
      return setError('You have to choose rating value from 1 to 5 stars');
    }

    if (!description) {
      return setError('Description is required!');
    }

    createOrUpdate(description, ratingValue);
  };

  return (
    <div style={{ padding: width >= 960 ? '30px' : '10px' }}>
      { error && <Typography className="error" variant="body1">{error}</Typography> }
      <div style={{ marginBottom: '30px', fontSize: '32px' }}>
        <i
          className={ratingValue >= 1 ? 'fas fa-star' : 'far fa-star'}
          style={{ color: '#eb8a2f', cursor: 'pointer' }}
          onClick={() => changeRatingValue(1)}
        />
        &nbsp;
        <i
          className={ratingValue >= 2 ? 'fas fa-star' : 'far fa-star'}
          style={{ color: '#eb8a2f', cursor: 'pointer' }}
          onClick={() => changeRatingValue(2)}
        />
        &nbsp;
        <i
          className={ratingValue >= 3 ? 'fas fa-star' : 'far fa-star'}
          style={{ color: '#eb8a2f', cursor: 'pointer' }}
          onClick={() => changeRatingValue(3)}
        />
        &nbsp;
        <i
          className={ratingValue >= 4 ? 'fas fa-star' : 'far fa-star'}
          style={{ color: '#eb8a2f', cursor: 'pointer' }}
          onClick={() => changeRatingValue(4)}
        />
        &nbsp;
        <i
          className={ratingValue >= 5 ? 'fas fa-star' : 'far fa-star'}
          style={{ color: '#eb8a2f', cursor: 'pointer' }}
          onClick={() => changeRatingValue(5)}
        />
        &nbsp;
      </div>
      <TextField
        multiline
        label="Description"
        variant="outlined"
        rows={4}
        value={description}
        onChange={(e) => changeDescription(e.target.value)}
        style={{ width: '100%' }}
      />
      <Button
        variant="contained"
        style={{ color: 'white', backgroundColor: '#e73e3e', marginTop: '10px' }}
        onClick={submitRating}
        disabled={isSubmittingRating}
      >
        { isSubmittingRating && <img height={23} style={{ marginRight: '10px' }} src={loading} alt="loading..." /> } {rating._id ? 'Edit rating' : 'Add rating'}
      </Button>
    </div>
  );
};

export default connector(EditRating);