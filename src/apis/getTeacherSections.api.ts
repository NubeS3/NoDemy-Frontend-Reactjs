import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getTeacherSectionsApi = async (courseId: string, accessToken: string) => {
  try {
    const response = await api.get(endpoints.getTeacherSections(courseId));
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

export default getTeacherSectionsApi;
