/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Typography } from "@material-ui/core";

import useWindowDimensions from "../../utils/useWindowDimensions.util";

import '../../styles/components/Home/Home.scss';
import loading from '../../assets/loadings/medium.loading.gif';

import Banners from "./Banners";
import CoursesSlider from "./CoursesSlider";

import { widthScreens } from "../../configs/sizes.config";
import { RootState } from "../../reducers/root.reducer";
import { fetchHotCourses } from '../../reducers/hotCourses.reducer';
import { fetchNewCourses } from '../../reducers/newCourses.reducer';
import { fetchTopViewedCourses } from '../../reducers/topViewedCourses.reducer';
import { fetchMostRegisteredCategories } from '../../reducers/categories.reducer';
import paths from "../../configs/paths.config";
import { Redirect, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import RouterProps from "../../types/RouterProps.type";

const mapStateToProps = (state: RootState) => ({
  isFetchingHotCourses: state.hotCoursesReducer.isFetchingHotCourses,
  hotCourses: state.hotCoursesReducer.hotCourses,
  isFetchingNewCourses: state.newCoursesReducer.isFetchingNewCourses,
  newCourses: state.newCoursesReducer.newCourses,
  isFetchingTopViewedCourses: state.topViewedCoursesReducer.isFetchingTopViewedCourses,
  topViewedCourses: state.topViewedCoursesReducer.topViewedCourses,
  isFetchingMostRegisteredCategories: state.categoriesReducer.isFetchingMostRegisteredCategories,
  mostRegisteredCategories: state.categoriesReducer.mostRegisteredCategories,
  accessToken: state.authenticationReducer.accessToken,
});

const mapDispatchToProps = {
  fetchHotCourses,
  fetchNewCourses,
  fetchTopViewedCourses,
  fetchMostRegisteredCategories,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type HomeProps = ConnectedProps<typeof connector> & RouterProps;

const Home = ({
  isFetchingHotCourses,
  hotCourses,
  fetchHotCourses,
  isFetchingNewCourses,
  newCourses,
  fetchNewCourses,
  isFetchingTopViewedCourses,
  topViewedCourses,
  fetchTopViewedCourses,
  isFetchingMostRegisteredCategories,
  mostRegisteredCategories,
  fetchMostRegisteredCategories,
  accessToken,
  history,
}: HomeProps) => {
  const { width } = useWindowDimensions();

  const [goToListCourses, setGoToListCourses] = useState('');

  useEffect(() => {
    if (isFetchingMostRegisteredCategories) {
      fetchMostRegisteredCategories();
    }
    fetchHotCourses();
    fetchNewCourses();
    fetchTopViewedCourses();
  }, [accessToken]);

  if (goToListCourses) {
    return <Redirect push to={goToListCourses} />
  }

  return (
    <div className="Home">
      <Header history={history} />
      {
        width >= widthScreens.m &&
        <div className="Home__hot-categories">
        {
          mostRegisteredCategories.map((category) => {
            return (
              <div
                key={category._id}
                className="Home__hot-categories__category"
                onClick={() => setGoToListCourses(`${paths.listCourses()}?category=${category.name}`)}
              >
                {category.name}
              </div>
            );
          })
        }
        </div>
      }

      <Banners />

      <div className="Home__content">
        {
          !isFetchingHotCourses && hotCourses.length > 0 &&
          <Typography
            variant="h5"
            className="title Home__content__title no-select"
          >
            Hot courses last week
          </Typography>
        }

        { !isFetchingHotCourses && hotCourses.length > 0 && <CoursesSlider courses={hotCourses} /> }
        {
          isFetchingHotCourses &&
          <div style={{ width: 100, margin: '20px auto' }}>
            <img src={loading} height={100} alt="Loading hot courses..." />
          </div>
        }

        {
          !isFetchingTopViewedCourses && topViewedCourses.length > 0 &&
          <Typography
            variant="h5"
            className="title Home__content__title no-select"
          >
            Top viewed courses
          </Typography>
        }
        { !isFetchingTopViewedCourses && topViewedCourses.length > 0 &&  <CoursesSlider courses={topViewedCourses} /> }
        {
          isFetchingTopViewedCourses &&
          <div style={{ width: 100, margin: '20px auto' }}>
            <img src={loading} height={100} alt="Loading top viewed courses..." />
          </div>
        }

        {
          !isFetchingNewCourses && newCourses.length > 0 &&
          <Typography
            variant="h5"
            className="title Home__content__title no-select"
          >
            New courses
          </Typography>
        }
        { !isFetchingNewCourses && newCourses.length > 0 &&  <CoursesSlider courses={newCourses} /> }
        {
          isFetchingNewCourses &&
          <div style={{ width: 100, margin: '20px auto' }}>
            <img src={loading} height={100} alt="Loading new courses..." />
          </div>
        }
      </div>
    </div>
  );
};

export default withRouter(connector(Home));