/* eslint-disable react-hooks/exhaustive-deps */
import { KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import queryString from 'query-string';

import paths from '../../configs/paths.config';

import logo from '../../assets/logo.png';
import '../../styles/components/Header/HeaderPc.scss';

import { RootState } from '../../reducers/root.reducer';
import { useEffect, useState } from 'react';
import UserMenuPc from './UserMenuPc';
import MainCategoriesPc from './MainCategoriesPc';
import HistoryProps from '../../types/HistoryProps.type';

const mapStateToProps = (state: RootState) => ({
  user: state.accountReducer.user,
  accessToken: state.authenticationReducer.accessToken,
});

const connector = connect(mapStateToProps);

type HeaderPcType = ConnectedProps<typeof connector> & HistoryProps;

const HeaderPc = ({ user, accessToken, history }: HeaderPcType) => {
  const [title, setTitle] = useState('');
  const [goToListCourses, setGotoListCourses] = useState('');

  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [isHoveringCategories, setIsHoveringCategories] = useState(false);

  useEffect(() => {
    const query = queryString.parse(history.location.search);
    setTitle((prev: string) => {
      const rawTitle = query.title ? query.title.toString() : '';
      return prev !== rawTitle ? rawTitle : prev;
    });
  }, [history.location.search]);

  useEffect(() => {
    if (goToListCourses) {
      history.push(goToListCourses);
    }
  }, [goToListCourses])

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setGotoListCourses(`${paths.listCourses()}?title=${title}`);
    }
  };

  return (
    <div className="HeaderPc">
      <Link className="HeaderPc__logo-link" to={paths.base}>
        <img src={logo} alt="Nodemy's logo" height={50} />
        <p className="title HeaderPc__logo-link__name">Nodemy</p>
      </Link>
      <div
        className="HeaderPc__buttons"
        style={{ height: '65px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        onMouseEnter={() => setIsHoveringCategories(true)}
        onMouseLeave={() => setIsHoveringCategories(false)}
      >
        Categories
      </div>

      <div className="HeaderPc__search-bar">
        <svg
          className="HeaderPc__search-bar__icon"
          viewBox="0 0 24 24"
        >
          <path fill="#919191" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          placeholder="Search for course by name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={handleSearch}
        />
      </div>

      {
        accessToken && user.accountType === 'Admin' &&
        <Button
          className="HeaderPc__buttons"
          onClick={() => history.push(paths.admin)}
        >
          Administrator
        </Button>
      }

      {
        accessToken && user.accountType === 'Student' &&
        <Button
          className="HeaderPc__buttons"
          onClick={() => history.push(paths.becomeTeacher)}
        >
          Become teacher
        </Button>
      }

      {
        accessToken && user.accountType !== 'Student' &&
        <Button
          className="HeaderPc__buttons"
          onClick={() => history.push(paths.teacher)}
        >
          Teacher
        </Button>
      }

      {
        accessToken &&
        <Button
          className="HeaderPc__buttons"
          onClick={() => history.push(paths.myCourses)}
        >
          My courses
        </Button>
      }

      {
        accessToken &&
        <div className="HeaderPc__icon">
          <Link to={paths.wishlist}>
            <svg
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </Link>
        </div>
      }

      <div className={`HeaderPc__icon${accessToken ? ' HeaderPc__icon--logged-in' : ''}`}>
        <Link to={paths.cart}>
          <svg
            viewBox="0 0 24 24"
          >
            <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0020.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </Link>
      </div>

      {
        !accessToken &&
        <Button
          variant="outlined"
          className="HeaderPc__buttons HeaderPc__buttons--login"
          onClick={() => history.push(paths.login)}
        >
          Login
        </Button>
      }

      {
        !accessToken &&
        <Button
          variant="outlined"
          className="HeaderPc__buttons HeaderPc__buttons--register"
          onClick={() => history.push(paths.register)}
        >
          Register
        </Button>
      }

      {
        accessToken &&
        <Link
          className="HeaderPc__avatar"
          to={paths.userProfile}
          onMouseEnter={() => setIsHoveringAvatar(true)}
          onMouseLeave={() => setIsHoveringAvatar(false)}
        >
          <img src={user.avatar} alt={`${user.fullname}`} height={50} />
        </Link>
      }

      <UserMenuPc
        isHoveringAvatar={isHoveringAvatar}
        setIsHoveringAvatar={setIsHoveringAvatar}
        history={history}
      />

      <MainCategoriesPc
        isHoveringCategories={isHoveringCategories}
        setIsHoveringCategories={setIsHoveringCategories}
        history={history}
      />
    </div>
  );
};

export default connector(HeaderPc);