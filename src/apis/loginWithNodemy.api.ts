import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

export type LoginWithNodemyBody = {
  email: string;
  password: string;
};

const loginWithNodemyApi = async (credentials: LoginWithNodemyBody) => {
  try {
    const response = await api.post(endpoints.loginWithNodemy(), credentials);
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

export default loginWithNodemyApi;
