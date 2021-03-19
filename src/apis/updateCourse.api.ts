import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';
import UpdateCourse from '../types/UpdateCourse.type';

const updateCourseApi = async (courseId: string, accessToken: string, data: UpdateCourse) => {
  try {
    const response = await api.patch(endpoints.updateCourse(courseId), data, {
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

export default updateCourseApi;
