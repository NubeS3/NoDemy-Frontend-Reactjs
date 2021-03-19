/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from "react-router-dom";
import paths from "../../configs/paths.config";
import { RootState } from "../../reducers/root.reducer";
import RouterProps from "../../types/RouterProps.type";
import { NavBarLink } from "../common/NavBar";
import PageWrapper from "../common/PageWrapper";
import { fetchWishlist, removeFromWishlist, resetWishlistState } from '../../reducers/wishlist.reducer';
import GridCourses from "../GridCourses/GridCourses";
import loading from '../../assets/loadings/medium.loading.gif';

const mapStateToProps = (state: RootState) => ({
  listCourses: state.wishlistReducer.listCourses,
  isFetchingListCourses: state.wishlistReducer.isFetchingListCourses,
});

const mapDispatchToProps = {
  fetchWishlist,
  removeFromWishlist,
  resetWishlistState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type WishListProps = RouterProps & ConnectedProps<typeof connector>;

const Wishlist = ({ history, fetchWishlist, listCourses, isFetchingListCourses, removeFromWishlist, resetWishlistState }: WishListProps) => {
  const links: Array<NavBarLink> = [{
    name: 'Home',
    url: paths.base
  }, {
    name: 'Wishlist',
    url: paths.wishlist,
  }];

  useEffect(() => {
    fetchWishlist();

    return () => {
      resetWishlistState();
    };
  }, []);

  const handleRemoveCourseFromWishlist = (courseId: string) => {
    removeFromWishlist(courseId);
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
        buttonText="Remove from wishlist"
        callback={handleRemoveCourseFromWishlist}
        title="My wishlist"
      />
    }
    </PageWrapper>
  );
};

export default withRouter(connector(Wishlist));