import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const logoutApi = async (refreshToken: string) => {
  try {
    const response = await api.delete(endpoints.logout(), {
      headers: {
        'Nodemy-Authorization': refreshToken,
      },
    });
    const result: ResponseSuccess = {
      code: response.status,
      data: '',
    };
    return result;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default logoutApi;
