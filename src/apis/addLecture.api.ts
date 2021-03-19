import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const addLectureApi = async (accessToken: string, data: FormData, progressCallback: (progressEvent: any) => void) => {
  try {
    const response = await api.post(endpoints.addLecture(), data, {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
      onUploadProgress: progressCallback,
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

export default addLectureApi;
