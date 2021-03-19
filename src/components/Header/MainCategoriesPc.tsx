import { Typography } from '@material-ui/core';
import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import paths from '../../configs/paths.config';
import { RootState } from '../../reducers/root.reducer';
import '../../styles/components/Header/MainCategoriesPc.scss';
import HistoryProps from '../../types/HistoryProps.type';

const mapStateToProps = (state: RootState) => ({
  orderCategories: state.categoriesReducer.orderCategories,
});

const connector = connect(mapStateToProps);

type MainCategoriesPcProps = ConnectedProps<typeof connector> & HistoryProps & {
  isHoveringCategories: boolean;
  setIsHoveringCategories: Function;
};

const MainCategoriesPc = ({ isHoveringCategories, setIsHoveringCategories, orderCategories, history }: MainCategoriesPcProps) => {
  const [showSubCategories, setShowSubCategories] = useState(-1);

  return (
    <div
      className="MainCategoriesPc"
      style={{ display: isHoveringCategories ? 'block' : 'none' }}
      onMouseEnter={() => setIsHoveringCategories(true)}
      onMouseLeave={() => setIsHoveringCategories(false)}
    >
    {
      orderCategories.map((category, index) => (
        <div key={category._id}>
          <div
            onMouseEnter={() => setShowSubCategories(index)}
            onMouseLeave={() => setShowSubCategories(-1)}
          >
            <div
              className="MainCategoriesPc__category"
              onClick={() => { history.push(`${paths.listCourses()}?category=${category.name}`) }}
            >
              {category.name}
              {
                category.subCategories && category.subCategories.length > 0 &&
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <i className="fas fa-caret-down" />
                </div>
              }
            </div>
          </div>
          {
            showSubCategories === index &&
            category.subCategories.map((subCategory) => (
              <div
                key={subCategory._id}
                onMouseEnter={() => setShowSubCategories(index)}
                onMouseLeave={() => setShowSubCategories(-1)}
                onClick={() => history.push(`${paths.listCourses()}?category=${subCategory.name}`)}
              >
                <Typography className="MainCategoriesPc__category MainCategoriesPc__category--sub">
                  {subCategory.name}
                </Typography>
              </div>
            ))
          }
        </div>
      ))
    }
    </div>
  );
};

export default connector(MainCategoriesPc);
