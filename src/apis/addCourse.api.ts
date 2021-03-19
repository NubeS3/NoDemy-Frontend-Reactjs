import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import AddCourse from '../types/AddCourse.type';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const addCourseApi = async (accessToken: string, data: AddCourse) => {
  try {
    const response = await api.post(endpoints.addCourse(), data, {
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

export default addCourseApi;
