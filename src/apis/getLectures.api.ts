import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getLecturesApi = async (sectionId: string) => {
  try {
    const response = await api.get(endpoints.getLectures(sectionId));
    const lectures: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return lectures;
  }
  catch (error) {
    console.log(endpoints.getLectures(sectionId));
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getLecturesApi;
