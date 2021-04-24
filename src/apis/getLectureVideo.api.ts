import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getLectureVideoApi = async (accessToken: string,
                                  id: string) => {
    try {
        const response = await api.get(endpoints.getVideoUrl(id), {
            headers: {
                'Nodemy-Authentication': accessToken,
            }
        });
        const urlData: ResponseSuccess = {
            code: response.status,
            data: response.data,
        };
        return urlData;
    } catch (error) {
        const errorObj: ResponseError = {
            code: error.response.status,
            error: error.response.data.error,
        };

        return errorObj;
    }
};

export default getLectureVideoApi;
