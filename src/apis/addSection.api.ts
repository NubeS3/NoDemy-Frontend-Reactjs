import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import AddSection from '../types/AddSection.type';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const addSectionApi = async (accessToken: string, data: AddSection) => {
  try {
    const response = await api.post(endpoints.addSection(), data, {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const section: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return section;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default addSectionApi;
