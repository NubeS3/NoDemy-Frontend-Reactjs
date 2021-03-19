import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

type RegisterApiBody = {
  email: string;
  fullname: string;
};

const registerApi = async (user: RegisterApiBody) => {
  try {
    const response = await api.post(endpoints.register(), user);
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

export default registerApi;
