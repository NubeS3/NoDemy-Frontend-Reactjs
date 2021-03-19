import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const deleteLectureApi = async (accessToken: string, lectureId: string) => {
  try {
    const response = await api.delete(endpoints.deleteLecture(lectureId), {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const lecture: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return lecture;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default deleteLectureApi;
