import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getListCoursesAdminApi = async (accessToken: string) => {
  try {
    const response = await api.get(endpoints.getCoursesAdminEndpoint(), {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const coursesResponse: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return coursesResponse;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getListCoursesAdminApi;
