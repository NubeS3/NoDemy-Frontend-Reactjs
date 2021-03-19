import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const downgradeUserAPI = async (accessToken: string, userId: string) => {
  try {
    const response = await api.patch(endpoints.downgradeUser(), { userId }, {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const section: ResponseSuccess = {
      code: response.status,
      data: {},
    };
    return section;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: '',
    };

    return errorObj;
  }
};

export default downgradeUserAPI;
