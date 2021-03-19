import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getAccessTokenApi = async (refreshToken: string) => {
  try {
    const response = await api.post(endpoints.getAccessToken(), {}, {
      headers: {
        'Nodemy-Authorization': refreshToken,
      },
    });
    const accessToken: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return accessToken;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getAccessTokenApi;
