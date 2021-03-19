import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const buyCourseApi = async (courseId: string, accessToken: string) => {
  try {
    const response = await api.patch(endpoints.buyCourse(courseId), {}, {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const message: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return message;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default buyCourseApi;
