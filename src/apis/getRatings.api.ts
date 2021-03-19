import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getRatingsApi = async (courseId: string, page: number = 1) => {
  try {
    const response = await api.get(endpoints.getAllRatings(courseId, page));
    const ratings: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return ratings;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getRatingsApi;
