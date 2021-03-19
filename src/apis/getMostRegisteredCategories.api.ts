import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getMostRegisteredCategoriesApi = async () => {
  try {
    const response = await api.get(endpoints.getMostRegisteredCategories());
    const categories: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return categories;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getMostRegisteredCategoriesApi;
