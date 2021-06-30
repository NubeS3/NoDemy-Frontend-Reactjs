import { Link } from 'react-router-dom';

import paths from '../../configs/paths.config';

import logo from '../../assets/logo.png';
import '../../styles/components/Header/MenuHeaderMobile.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../reducers/root.reducer';
import { Button, Divider, Typography } from '@material-ui/core';
import HistoryProps from '../../types/HistoryProps.type';
import { useState } from 'react';

import { logout } from '../../reducers/authorization.reducer';

const mapStateToProps = (state: RootState) => ({
  accessToken: state.authenticationReducer.accessToken,
  user: state.accountReducer.user,
  mostRegisteredCategories: state.categoriesReducer.mostRegisteredCategories,
  orderCategories: state.categoriesReducer.orderCategories,
});

const mapDispatchToProps = {
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type MenuHeaderMobileProps = ConnectedProps<typeof connector> & HistoryProps & {
  openMenu: boolean;
  setOpenMenu: Function;
};

const MenuHeaderMobile = ({
  openMenu,
  setOpenMenu,
  accessToken,
  user,
  history,
  mostRegisteredCategories,
  orderCategories,
  logout,
}: MenuHeaderMobileProps) => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <div
      style={{ display: openMenu ? 'block' : 'none' }}
      className="MenuHeaderMobile"
    >
      <div className="MenuHeaderMobile__header-wrapper">
        <Link to={paths.base} className="MenuHeaderMobile__logo">
          <img src={logo} alt="" />
          <p className="title">Nodemy</p>
        </Link>

        <i className="fas fa-times MenuHeaderMobile__close" onClick={() => setOpenMenu(false)} />
      </div>

      <Divider />

    {
      !accessToken &&
      <div style={{ padding: '0 15px' }}>
        <Button
          className="MenuHeaderMobile__buttons MenuHeaderMobile__buttons--login"
          variant="contained"
          style={{ marginTop: '15px', marginBottom: '5px' }}
          onClick={() => history.push(paths.login)}
        >
          Login
        </Button>

        <Button
          className="MenuHeaderMobile__buttons MenuHeaderMobile__buttons--register"
          variant="contained"
          style={{ marginTop: '5px', marginBottom: '15px' }}
          onClick={() => history.push(paths.register)}
        >
          Register
        </Button>
      </div>
    }

    {
      accessToken &&
      <div className="MenuHeaderMobile__user-info" style={{ cursor: 'pointer' }}>
        <div className="MenuHeaderMobile__avatar" onClick={() => history.push(paths.userProfile)}>
          <img src={`data:image/jpeg;base64,${user.avatar}`} alt="avatar" />
        </div>
        <div className="MenuHeaderMobile__text" onClick={() => history.push(paths.userProfile)}>
          <p className="MenuHeaderMobile__fullname">{user.fullname}</p>
          <p>{user.email}</p>
        </div>
      </div>
    }

    {
      accessToken &&
      <div style={{ padding: '0 15px', marginTop: '10px' }}>
        <button
          className="MenuHeaderMobile__white-buttons"
          onClick={() => history.push(paths.myCourses)}
        >
          <i className="fab fa-leanpub" /> &nbsp; My courses
        </button>

        <button
          className="MenuHeaderMobile__white-buttons"
          onClick={() => history.push(paths.cart)}
        >
          <i className="fas fa-shopping-cart" /> &nbsp; My cart
        </button>

        <button
          className="MenuHeaderMobile__white-buttons"
          onClick={() => history.push(paths.wishlist)}
        >
          <i className="fas fa-heart" /> &nbsp; My wishlist
        </button>
      </div>
    }

    {
      accessToken && <Divider style={{ margin: '10px 0' }} />
    }

    {
      accessToken && user.accountType !== 'Student' &&
      <div style={{ padding: '0 15px', marginTop: '10px' }}>
        <button
          className="MenuHeaderMobile__white-buttons"
          onClick={() => history.push(paths.teacher)}
        >
          <i className="fas fa-chalkboard-teacher" /> &nbsp; Teacher
        </button>
      </div>
    }

    {
      accessToken && user.accountType === 'Admin' &&
      <div style={{ padding: '0 15px' }}>
        <button
          className="MenuHeaderMobile__white-buttons"
          onClick={() => history.push(paths.admin)}
        >
          <i className="fas fa-users-cog" /> &nbsp; Administrator
        </button>
      </div>
    }

    {
      accessToken && user.accountType === 'Student' &&
      <div style={{ padding: '0 15px' }}>
        <button
          className="MenuHeaderMobile__white-buttons"
          onClick={() => history.push(paths.becomeTeacher)}
        >
          <i className="fas fa-chalkboard-teacher" /> &nbsp; Become teacher
        </button>
      </div>
    }

    {
      accessToken && <Divider style={{ margin: '10px 0' }} />
    }

      <div style={{ padding: '0 15px', marginTop: '10px' }}>
        <Typography className="MenuHeaderMobile__header">Most popular categories</Typography>
        {
          mostRegisteredCategories.map((category) => (
            <button
              key={category._id}
              className="MenuHeaderMobile__white-buttons"
              onClick={() => history.push(`${paths.listCourses()}?category=${category.name}`)}
            >
              {category.name}
            </button>
          ))
        }
      </div>
      
      <Divider style={{ margin: '10px 0' }} />

      <div style={{ padding: '0 15px', marginTop: '10px' }}>
        <div
          className="MenuHeaderMobile__header MenuHeaderMobile__header--all-categories"
          onClick={() => setShowAllCategories(prev => !prev)}
        >
          <div>All categories</div> <i className={`fas fa-caret-${showAllCategories ? 'up' : 'down'}`} />
        </div>

        {
          showAllCategories && orderCategories.map((category) => (
            <div key={category._id}>
              <button
                className="MenuHeaderMobile__white-buttons"
                onClick={() => history.push(`${paths.listCourses()}?category=${category.name}`)}
              >
                {category.name}
              </button>

              {
                category.subCategories.map((subCategory) => (
                  <button
                    key={subCategory._id}
                    className="MenuHeaderMobile__white-buttons"
                    onClick={() => history.push(`${paths.listCourses()}?category=${subCategory.name}`)}
                    style={{ paddingLeft: 30 }}
                  >
                    {subCategory.name}
                  </button>
                ))
              }
            </div>
          ))
        }
      </div>

      {
        accessToken && <Divider style={{ margin: '10px 0' }} />
      }

      {
        accessToken &&
        <div style={{ padding: '0 15px', marginTop: '10px' }}>
          <button
            className="MenuHeaderMobile__white-buttons"
            onClick={() => logout()}
          >
            <i className="fas fa-sign-out-alt" /> &nbsp; Logout
          </button>
        </div>
      }
    </div>
  );
};

export default connector(MenuHeaderMobile);