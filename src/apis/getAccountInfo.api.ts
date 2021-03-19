import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getAccountInfoApi = async (accessToken: string) => {
  try {
    const response = await api.get(endpoints.getAccountInfo(), {
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

export default getAccountInfoApi;
