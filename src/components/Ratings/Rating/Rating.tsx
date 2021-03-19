import { Divider, Grid, Typography } from '@material-ui/core';
import RatingType from '../../../types/Rating.type';
import useWindowDimensions from '../../../utils/useWindowDimensions.util';

type RatingProps = {
  rating: RatingType;
  last?: boolean;
}

const Rating = ({ rating, last }: RatingProps) => {
  const {width} = useWindowDimensions();

  return (
    <div style={{
      padding: width >= 960 ? '30px' : '10px'
    }}>
      <Grid container justify="space-between" style={{ alignItems: 'center' }}>
        <Grid item xs={12} md={8} style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img src={rating.avatar} alt="" height={50} style={{ borderRadius: '50%' }} />
          </div>
          <Typography variant="h6" style={{ marginLeft: '5px' }}>{rating.fullname}</Typography>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: width >= 960 ? 'right': 'left' }}>
          <Typography variant="body1">Last updated at: {(new Date(rating.updatedAt)).toLocaleDateString()}</Typography>
        </Grid>
      </Grid>
      <div style={{ color: '#eb8a2f', marginTop: '5px' }}>
        <Typography variant="body1" style={{ display: 'inline', fontWeight: 600, marginRight: '5px' }}>{rating.rating}</Typography>
        {
          rating.rating >= 1 && <><i className="fas fa-star" /> &nbsp;</>
        }
        {
          rating.rating >= 2 && <><i className="fas fa-star" /> &nbsp;</>
        }
        {
          rating.rating >= 3 && <><i className="fas fa-star" /> &nbsp;</>
        }
        {
          rating.rating >= 4 && <><i className="fas fa-star" /> &nbsp;</>
        }
        {
          rating.rating === 5 && <><i className="fas fa-star" /> &nbsp;</>
        }
      </div>
      <Typography style={{ marginTop: '5px' }} variant="body1">{rating.description}</Typography>
      {
        !last && <Divider style={{ margin: '15px 0' }} />
      }
    </div>
  )
};

export default Rating;
