import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

type ConfirmEmailBody = {
  token: string;
  password: string;
};

const confirmEmailApi = async (userId: string, data: ConfirmEmailBody) => {
  try {
    const response = await api.post(endpoints.confirmEmail(userId), data);
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

export default confirmEmailApi;
