import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const createRatingApi = async (accessToken: string, data = {
  description: '',
  courseId: '',
  rating: 1 | 2 | 3 | 4 | 5,
}) => {
  try {
    const response = await api.post(endpoints.createRating(), data, {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const rating: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return rating;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default createRatingApi;
