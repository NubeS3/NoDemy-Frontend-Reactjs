/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import logo from '../../assets/logo.png';
import paths from '../../configs/paths.config';
import '../../styles/components/Header/HeaderMobile.scss';
import MenuHeaderMobile from './MenuHeaderMobile';

type HeaderMobileProps = {
  history: {
    push: Function,
    location: {
      search: string
    }
  }
};

const HeaderMobile = ({ history }: HeaderMobileProps) => {
  const [title, setTitle] = useState('');
  const [goToListCourses, setGotoListCourses] = useState('');

  const [openMenu, setOpenMenu] = useState(false);

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
  }, [goToListCourses]);

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setGotoListCourses(`${paths.listCourses()}?title=${title}`);
    }
  };

  return (
    <div className="HeaderMobile">
      <MenuHeaderMobile
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        history={history}
      />

      <div className="HeaderMobile__burger" onClick={() => setOpenMenu(true)}>
        <div style={{ marginTop: '10px' }} />
        <div />
        <div />
      </div>

      <div className="HeaderMobile__search-bar">
        <svg
          className="HeaderMobile__search-bar__icon"
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

      <Link to={paths.base} className="HeaderMobile__logo-link">
        <img src={logo} alt="Nodemy's logo" height={30} />
      </Link>
    </div>
  );
};

export default HeaderMobile;