import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getCoursesSameCategoryApi = async (accessToken: string, courseId: string) => {
  try {
    const response = await api.get(endpoints.getCoursesSameCategory(courseId), {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const courses: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return courses;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getCoursesSameCategoryApi;
