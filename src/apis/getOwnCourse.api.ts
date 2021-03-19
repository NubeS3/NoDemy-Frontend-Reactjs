import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getOwnCourseApi = async (accessToken: string, courseId: string) => {
  try {
    const response = await api.get(endpoints.getOwnCourse(courseId), {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const course: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return course;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getOwnCourseApi;
