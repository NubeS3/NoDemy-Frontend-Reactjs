/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, FunctionComponent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import queryString from 'query-string';

import paths from '../../configs/paths.config';
import { RootState } from '../../reducers/root.reducer';
import { fetchListCourses } from '../../reducers/listCourses.reducer';
import { fetchAllCategories } from '../../reducers/categories.reducer';

import '../../styles/components/ListCourses/ListCourses.scss';
import loading from '../../assets/loadings/medium.loading.gif';

import { NavBarLink } from '../common/NavBar';
import PageWrapper from '../common/PageWrapper';
import RouterProps from '../../types/RouterProps.type';
import useWindowDimensions from '../../utils/useWindowDimensions.util';
import { widthScreens } from '../../configs/sizes.config';

import CourseBasic from '../CourseBasic/CourseBasic';
import { Pagination } from '@material-ui/lab';

const mapStateToProps = (state: RootState) => ({
  isFetchingListCourses: state.listCoursesReducer.isFetchingListCourses,
  listCourses: state.listCoursesReducer.listCourses,
  totalCourses: state.listCoursesReducer.totalCourses,
  totalPages: state.listCoursesReducer.totalPages,
  categories: state.categoriesReducer.categories,
});

const mapDispatchToProps = {
  fetchListCourses,
  fetchAllCategories,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ListCoursesProps = ConnectedProps<typeof connector> & RouterProps;

const ListCourses: FunctionComponent<ListCoursesProps> = ({
  isFetchingListCourses,
  listCourses,
  totalCourses,
  totalPages,
  fetchListCourses,
  history,
  categories,
  fetchAllCategories,
}) => {
  const { width } = useWindowDimensions();

  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(null);
  const [title, setTitle] = useState(null);

  const links: Array<NavBarLink> = [{
    name: 'Home',
    url: paths.base,
  }, {
    name: 'Courses',
    url: `${history.location.pathname}${history.location.search}`,
  }];

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    const query = queryString.parse(history.location.search);

    setTitle((prev: string) => {
      const rawTitle = query.title ? query.title.toString() : '';
      return rawTitle !== prev ? rawTitle : prev;
    });

    setCategory((prev: string) => {
      const rawCategory = query.category ? query.category.toString() : '';
      return rawCategory !== prev ? rawCategory : prev;
    });

    setSort((prev: string) => {
      const rawSort = query.sort ? query.sort.toString() : '';
      return prev !== rawSort ? rawSort : prev;
    });

    setPage((prev: number) => {
      const rawPage = typeof query.page === 'string' && parseInt(query.page) >= 1 ? parseInt(query.page) : 1;
      return prev !== rawPage ? rawPage : prev;
    });
  }, [history.location.search]);

  useEffect(() => {
    if (category !== null && sort !== null && page !== null) {
      fetchListCourses(title, category, sort, page.toString());
    }
  }, [category, sort, page, title]);

  return (
    <PageWrapper links={links} history={history}>
      <div className="ListCourses">
        {
          !isFetchingListCourses &&
          <div>
            <Typography
              className="title ListCourses__title"
              variant="h5"
            >
              {totalCourses} courses { title ? `for "${title}"` : '' } { category ? `in "${category}"` : '' }
            </Typography>
          </div>
        }

        <div className="ListCourses__query">
          {
            category !== null &&
            <div className="ListCourses__query__categories">
              <FormControl
                variant="outlined"
                className="ListCourses__query__categories__form-control"
                size={width <= widthScreens.l ? "small" : "medium"}
              >
                <InputLabel id="search-by-categories">Search by categories</InputLabel>
                <Select
                  labelId="search-by-categories"
                  value={category || ""}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                    history.replace(`/courses?title=${title}&category=${e.target.value as string}&sort=${sort}&page=${page}`);
                  }}
                  label="Search by categories"
                >
                  <MenuItem value=''>
                    <em>All categories</em>
                  </MenuItem>
                  {
                    categories.map((singleCategory) => {
                      return (
                        <MenuItem
                          key={singleCategory._id}
                          value={singleCategory.name}
                        >
                          {singleCategory.name}
                        </MenuItem>
                      );
                    })
                  }
                </Select>
              </FormControl>
            </div>
          }

          <div className="ListCourses__query__sort">
            <FormControl
              variant="outlined"
              className="ListCourses__query__sort__form-control"
              size={width <= widthScreens.l ? "small" : "medium"}
            >
              <InputLabel id="sort-courses">Sort courses</InputLabel>
              <Select
                labelId="sort-courses"
                value={sort || ""}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  history.replace(`/courses?title=${title}&category=${category}&sort=${e.target.value as string}&page=${page}`);
                }}
                label="Sort courses"
              >
                <MenuItem value="">
                  <em>No sort</em>
                </MenuItem>
                <MenuItem value="price">
                  Ascending by price
                </MenuItem>
                <MenuItem value="ratings">
                  Descending by ratings
                </MenuItem>
                <MenuItem value="ratings,price">
                  Both
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {
          isFetchingListCourses &&
          <div style={{ width: 150, margin: 'auto' }}>
            <img src={loading} alt="Loading..." />
          </div>
        }

        <div className="ListCourses__courses">
          {
            !isFetchingListCourses && listCourses.map((course) => {
              return (
                <CourseBasic key={course._id} type="landscape" course={course} />
              )
            })
          }

          {
            !isFetchingListCourses && totalPages > 0 &&
            <Grid container justify = "center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                  history.replace(`/courses?category=${category}&sort=${sort}&page=${value.toString()}`);
                }}
              />
            </Grid>
          }
        </div>
      </div>
    </PageWrapper>
  );
};

export default withRouter(connector(ListCourses));