import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

export type UpdateNodemyAccountBody = {
  email?: string;
  fullname?: string;
  currentPassword?: string;
  password?: string;
};

const UpdateNodemyAccountApi = async (updateBody: UpdateNodemyAccountBody, accessToken: string) => {
  try {
    const response = await api.patch(endpoints.updateNodemyAccount(), updateBody, {
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

export default UpdateNodemyAccountApi;
