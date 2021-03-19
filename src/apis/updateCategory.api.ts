import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const updateCatAPI = async (accessToken: string, id: string, data = {
    name: '',
    description: ''
}) => {
  try {
    const response = await api.patch(endpoints.updateCategoryEndpoint(id), data , {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    }
    );
    const cat: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return cat;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default updateCatAPI;
