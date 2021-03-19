import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const addCourseToWishlistApi = async (accessToken: string, courseId: string) => {
  try {
    const response = await api.patch(endpoints.addCourseToWishList(), { courseId }, {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const user: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return user;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default addCourseToWishlistApi;
