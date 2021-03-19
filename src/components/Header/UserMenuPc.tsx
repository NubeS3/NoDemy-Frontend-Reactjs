import { Typography } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../reducers/authorization.reducer';

import paths from '../../configs/paths.config';
import { RootState } from '../../reducers/root.reducer';
import '../../styles/components/Header/UserMenuPc.scss';
import HistoryProps from '../../types/HistoryProps.type';

const mapStateToProps = (state: RootState) => ({
  user: state.accountReducer.user,
  accessToken: state.authenticationReducer.accessToken,
});

const mapDispatchToProps = {
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type UserMenuPcProps = ConnectedProps<typeof connector> & HistoryProps & {
  isHoveringAvatar: boolean;
  setIsHoveringAvatar: Function;
};

const UserMenuPc = ({ isHoveringAvatar, setIsHoveringAvatar, user, logout, accessToken, history }: UserMenuPcProps) => {
  return (
    <div
      className="UserMenuPc"
      style={{ display: isHoveringAvatar && accessToken ? 'block' : 'none' }}
      onMouseEnter={() => setIsHoveringAvatar(true)}
      onMouseLeave={() => setIsHoveringAvatar(false)}
    >
      <div className="UserMenuPc__basic-info">
        <div className='UserMenuPc__avatar' onClick={() => history.push(paths.userProfile)}>
          <img src={user.avatar} alt="" />
        </div>
        <div className="UserMenuPc__info" onClick={() => history.push(paths.userProfile)}>
          <Typography className="UserMenuPc__info__text UserMenuPc__info__text--fullname">
            <Link to={paths.userProfile}>{user.fullname}</Link>
          </Typography>
          <Typography className="UserMenuPc__info__text">
            {user.email}
          </Typography>
        </div>
      </div>

      <hr className="UserMenuPc__divider" />

      <div className="UserMenuPc__account-courses">
        <Typography className="UserMenuPc__buttons">
          <Link to={paths.myCourses}>
            <i className="fab fa-leanpub" /> &nbsp; My courses
          </Link>
        </Typography>
        <Typography className="UserMenuPc__buttons">
          <Link to={paths.cart}>
            <i className="fas fa-shopping-cart" /> &nbsp; My cart
          </Link>
        </Typography>
        <Typography className="UserMenuPc__buttons">
          <Link to={paths.wishlist}>
            <i className="fas fa-heart" /> &nbsp; My wishlist
          </Link>
        </Typography>
      </div>

      <hr className="UserMenuPc__divider" />

      <div className="UserMenuPc__account-courses UserMenuPc__account-courses--logout">
        <div onClick={() => logout()}>
          <Typography className="UserMenuPc__buttons">
            <i className="fas fa-sign-out-alt" /> &nbsp; Logout
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default connector(UserMenuPc);