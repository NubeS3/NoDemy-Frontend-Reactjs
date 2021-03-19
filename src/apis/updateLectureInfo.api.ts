import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const updateLectureInfoApi = async (
  accessToken: string,
  lectureId: string,
  data: any,
) => {
  try {
    const response = await api.patch(endpoints.updateLectureInfo(lectureId), data, {
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

export default updateLectureInfoApi;
