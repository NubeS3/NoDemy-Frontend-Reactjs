import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const deleteSectionApi = async (accessToken: string, sectionId: string) => {
  try {
    const response = await api.delete(endpoints.deleteSection(sectionId), {
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

export default deleteSectionApi;
