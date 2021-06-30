import api from '../configs/api.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const addLectureUploadVideoApi = async (uploadUrl: string, token: string, data: FormData, progressCallback: (progressEvent: any) => void) => {
    try {
        const response = await api.post(uploadUrl, data, {
            onUploadProgress: progressCallback,
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export default addLectureUploadVideoApi;
