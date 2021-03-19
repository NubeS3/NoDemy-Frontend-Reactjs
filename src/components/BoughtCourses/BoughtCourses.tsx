/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from "react-router-dom";
import paths from "../../configs/paths.config";
import { RootState } from "../../reducers/root.reducer";
import RouterProps from "../../types/RouterProps.type";
import { NavBarLink } from "../common/NavBar";
import PageWrapper from "../common/PageWrapper";
import { resetBoughtCoursesState, fetchBoughtCourses } from '../../reducers/boughtCourses.reducer';
import GridCourses from "../GridCourses/GridCourses";
import loading from '../../assets/loadings/medium.loading.gif';

const mapStateToProps = (state: RootState) => ({
  isFetchingListCourses: state.boughtCoursesReducer.isFetchingListCourses,
  listCourses: state.boughtCoursesReducer.listCourses,
});

const mapDispatchToProps = {
  resetBoughtCoursesState,
  fetchBoughtCourses,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type BoughtCoursesProps = RouterProps & ConnectedProps<typeof connector>;

const BoughtCourses = ({
  history,
  resetBoughtCoursesState,
  isFetchingListCourses,
  listCourses,
  fetchBoughtCourses,
}: BoughtCoursesProps) => {
  const links: Array<NavBarLink> = [{
    name: 'Home',
    url: paths.base
  }, {
    name: 'My courses',
    url: paths.myCourses,
  }];

  useEffect(() => {
    fetchBoughtCourses();
    return () => {
      resetBoughtCoursesState();
    };
  }, []);

  const handleGoToDetails = (courseId: string) => {
    history.push(`/courses/${courseId}`);
  };

  return (
    <PageWrapper history={history} links={links}>
    {
      isFetchingListCourses &&
      <div style={{ width: '150px', margin: 'auto' }}>
        <img src={loading} alt="Loading..." />
      </div>
    }
    {
      !isFetchingListCourses &&
      <GridCourses
        listCourses={listCourses}
        buttonText="Go to course"
        callback={handleGoToDetails}
        title="My courses"
      />
    }
    </PageWrapper>
  );
};

export default withRouter(connector(BoughtCourses));