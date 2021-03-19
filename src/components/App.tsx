/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import paths from '../configs/paths.config';

import '../styles/components/App.scss';
import loading from '../assets/loadings/big.loading.gif';


// import Home from './Home';

import { RootState } from '../reducers/root.reducer';
import { getAccessToken } from '../reducers/authorization.reducer';
import { getUserProfile } from '../reducers/account.reducer';
import { fetchAllCategories } from '../reducers/categories.reducer';

import Page404 from './common/Page404';
import Register from './Register/Register';
import Login from './Login';
import Home from './Home/Home';
import ListCourses from './ListCourses/ListCourses';
import UserProfile from './UserProfile/UserProfile';
import CourseDetails from './CourseDetails/CourseDetails';
import LearningVideo from './LearningVideo/LearningVideo';
import Admin from './Admin';
import TeacherListCourses from './Teacher/ListCourses/ListCourses';
import AddEditCourse from './Teacher/AddEditCourse/AddEditCourse';
import ListSections from './Teacher/ListSections/ListSections';
import ListLectures from './Teacher/ListLectures/ListLectures';
import Wishlist from './Wishlist/Wishlist';
import BoughtCourses from './BoughtCourses/BoughtCourses';
import AdminLogin from './Admin/AdminLogin';

const mapStateToProps = (state: RootState) => ({
  refreshToken: state.authorizationReducer.refreshToken,
  accessToken: state.authenticationReducer.accessToken,
  isAuthorizing: state.authorizationReducer.isAuthorizing,
});

const mapDispatchToProps = {
  getAccessToken,
  getUserProfile,
  fetchAllCategories,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

const App = ({ accessToken, getAccessToken, isAuthorizing, getUserProfile, fetchAllCategories }: AppProps) => {
  useEffect(() => {
    getAccessToken();
    fetchAllCategories();
  }, []);

  useEffect(() => {
    let autoFetchAccessToken: NodeJS.Timeout = null;
    getUserProfile();
    if (accessToken) {
      getUserProfile();

      autoFetchAccessToken = setInterval(() => {
        getAccessToken();
      }, 43200000) // auto fetch access token every 12 hours
    }

    return () => {
      try {
        clearInterval(autoFetchAccessToken);
        autoFetchAccessToken = null;
      }
      catch { /** ignored */ }
    }
  }, [accessToken])

  if (isAuthorizing) {
    return (
      <div className="App">
        <img src={loading} alt="loading..." />
      </div>
    );
  }

  return (
    <Router basename={paths.base}>
      <Switch>
        <Route path={paths.base} exact component={Home} />
        <Route path={paths.register} exact component={Register} />
        <Route path={paths.login} exact component={Login} />
        <Route path={paths.admin} exact component={Admin} />
        <Route path={paths.adminLogin} exact component={AdminLogin} />
        <Route path={paths.listCourses()} exact component={ListCourses} />
        <Route path={paths.userProfile} exact component={UserProfile} />
        <Route path={`${paths.listCourses()}/:id`} exact component={CourseDetails} />
        <Route path={`${paths.listCourses()}/:courseId/learn`} exact component={LearningVideo} />
        <Route path={paths.teacher} exact component={TeacherListCourses} />
        <Route path={paths.addCourse} exact component={AddEditCourse} />
        <Route path={paths.editCourse} exact component={AddEditCourse} />
        <Route path={paths.editSections} exact component={ListSections} />
        <Route path={paths.editLectures} exact component={ListLectures} />
        <Route path={paths.wishlist} exact component={Wishlist} />
        <Route path={paths.myCourses} exact component={BoughtCourses} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default connector(App);
