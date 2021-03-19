import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getOwnSectionsApi = async (courseId: string, accessToken: string) => {
  try {
    const response = await api.get(endpoints.getOwnSections(courseId), {
      headers: {
        'Nodemy-Authentication': accessToken,
      }
    });
    const sections: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return sections;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getOwnSectionsApi;
