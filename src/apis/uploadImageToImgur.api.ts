import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import imgurKeys from '../configs/imgur.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const uploadImageToImgurApi = async (data: FormData) => {
  try {
    const response = await api.post(endpoints.uploadImageToImgur(), data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Client-ID ${imgurKeys.clientId}`,
      },
    });
    const imgurResponse: ResponseSuccess = {
      code: response.status,
      data: response.data.data.link,
    };
    return imgurResponse;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default uploadImageToImgurApi;
