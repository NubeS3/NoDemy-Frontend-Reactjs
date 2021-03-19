import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

export type UpdateGoogleAccountBody = {
  fullname?: string;
};

const UpdateGoogleAccountApi = async (user: UpdateGoogleAccountBody, accessToken: string) => {
  try {
    const response = await api.patch(endpoints.updateGoogleAccount(), user, {
      headers: {
        'Nodemy-Authentication': accessToken,
      }
    });
    const responseUser: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return responseUser;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default UpdateGoogleAccountApi;
