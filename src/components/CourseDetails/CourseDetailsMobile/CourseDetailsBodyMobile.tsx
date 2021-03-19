import { Button, Menu, MenuItem } from '@material-ui/core';
import { useState, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../reducers/root.reducer';
import '../../../styles/components/CourseDetails/CourseDetailsMobile/CourseDetailsBodyMobile.scss';
import EditRating from '../../Ratings/Rating/EditRating';
import Ratings from '../../Ratings/Ratings';
import CourseDetailsDescriptionMobile from './CourseDetailsDescriptionMobile';
import CourseDetailsSyllabusMobile from './CourseDetailsSyllabusMobile';

const mapStateToProps = (state: RootState) => ({
  course: state.courseReducer.course,
});

const connector = connect(mapStateToProps);

type CourseDetailsBodyMobileProps = ConnectedProps<typeof connector>;

const CourseDetailsBodyMobile = ({ course }: CourseDetailsBodyMobileProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tab, setTab] = useState('Description');

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChooseTab = (value: string) => {
    setTab(value);
    handleClose();
  }

  return (
    <div className="CourseDetailsBodyMobile">
      <Button className="CourseDetailsBodyMobile__buttons" aria-haspopup="true" onClick={handleClick}>{
        tab} &nbsp; <i className="fas fa-caret-down" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={() => handleChooseTab('Description')}>Description</MenuItem>
        <MenuItem onClick={() => handleChooseTab('Course contents')}>Course contents</MenuItem>
        <MenuItem onClick={() => handleChooseTab('Ratings')}>Ratings</MenuItem>
      </Menu>

      <div
        style={{
        marginTop: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
        padding: '10px',
        borderRadius: '4px'
        }}
      >
        {
          tab === 'Description' &&
          <CourseDetailsDescriptionMobile description={course.description} />
        }
        {
          tab === 'Course contents' &&
          <CourseDetailsSyllabusMobile />
        }
        {
          tab === 'Ratings' &&
          <div>
            {
              course.isBought && <EditRating />
            }
            <Ratings />
          </div>
        }
      </div>
    </div>
  );
};

export default connector(CourseDetailsBodyMobile);
