import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import createCatAPI from '../apis/createCat.api';
import deleteCatAPI from '../apis/deleteCat.api';
import getAllCategoriesApi from '../apis/getAllCategories.api';
import getMostRegisteredCategoriesApi from '../apis/getMostRegisteredCategories.api';
import updateCatAPI from '../apis/updateCategory.api';
import { AppThunk } from '../configs/store.config';
import Category from '../types/Category.type';
import { isResponseError } from '../types/ResponseError.type';

type OrderCategory = {
  _id: string;
  name: string;
  subCategories: Array<OrderCategory>;
};

const initialState = {
  mostRegisteredCategories: Array<Category>(),
  isFetchingMostRegisteredCategories: true,
  categories: Array<Category>(),
  isFetchingListCategories: true,
  orderCategories: Array<OrderCategory>(),
  error: false
};

const categoriesSlice = createSlice({
  name: 'categoriesReducer',
  initialState,
  reducers: {
    setHotCategories(state, action: PayloadAction<Array<Category>>) {
      state.mostRegisteredCategories = action.payload;
      state.isFetchingMostRegisteredCategories = false;
      state.error = false;
    },
    setListCategories(state, action: PayloadAction<Array<Category>>) {
      state.categories = action.payload;

      const orderCategories = Array<OrderCategory>();

      for (let i = 0; i < state.categories.length; ++i) {
        if (!state.categories[i].parentCategory) {
          orderCategories.push({
            _id: state.categories[i]._id,
            name: state.categories[i].name,
            subCategories: [],
          });
        }
      }

      for (let i = 0; i < state.categories.length; ++i) {
        if (state.categories[i].parentCategory) {
          for (let j = 0; j < orderCategories.length; ++j) {
            if (state.categories[i].parentCategory === orderCategories[j]._id) {
              orderCategories[j].subCategories.push({
                _id: state.categories[i]._id,
                name: state.categories[i].name,
                subCategories: [],
              })
            }
          }
        }
      }

      state.orderCategories = orderCategories;

      state.isFetchingListCategories = false;
      state.error = false;
    },
    addCategory(state, action: PayloadAction<Category>) { 
      state.categories.push(action.payload);
      state.error = false
    },
    updateCategory(state, action: PayloadAction<Category>) {
      state.categories = state.categories.map(cat => {
        if (cat._id === action.payload._id) {
          return {
            ...cat,
            description: action.payload.description,
            name: action.payload.name,
          }
        }
        return cat
      })
      state.error = false;
    },
    fireError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    }
  },
});

export const {
  setHotCategories,
  setListCategories,
  addCategory,
  updateCategory,
  fireError
} = categoriesSlice.actions;

export const fetchMostRegisteredCategories = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { categoriesReducer } = state;

  if (categoriesReducer.mostRegisteredCategories.length === 0) {
    const response = await getMostRegisteredCategoriesApi();
    if (isResponseError(response)) {
      return dispatch(setHotCategories([]));
    }

    dispatch(setHotCategories(response.data.categories));
  }
};

export const fetchAllCategories = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { categoriesReducer } = state;

  if (categoriesReducer.categories.length === 0) {
    const response = await getAllCategoriesApi();
    if (isResponseError(response)) {
      return dispatch(setListCategories([]));
    }

    dispatch(setListCategories(response.data.categories));
  }
};

export const createCategory = (data = {
    name: '',
    parentCategory: '',
    description: ''
}): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { adminAuthorizationReducer } = state;
  console.log(adminAuthorizationReducer)
  const { adminToken } = adminAuthorizationReducer;

  const response = await createCatAPI( adminToken, data);
  if (!isResponseError(response)) {
    return dispatch(addCategory(response.data.category));
  }
  };

export const editCategory = (data = {
    name: '',
    description: ''
}, id: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer } = state;
  const { accessToken } = authenticationReducer;

  const response = await updateCatAPI( accessToken, id, data);
  if (!isResponseError(response)) {
    return dispatch(updateCategory(response.data.category));
  }
};

export const deleteCategory = (id: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const { authenticationReducer, categoriesReducer } = state;
  const { accessToken } = authenticationReducer;

  const response = await deleteCatAPI(accessToken, id);
  if (!isResponseError(response)) {
    return dispatch(setListCategories(categoriesReducer.categories.filter(cat => cat._id !== id)));
  }
  return dispatch(fireError(true));
};

export default categoriesSlice.reducer;