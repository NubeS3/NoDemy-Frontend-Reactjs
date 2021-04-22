import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const addLectureStagingApi = async (accessToken: string,
                                    data:
                                        {
                                            sectionId: string,
                                            lectureName: string,
                                            canPreview: string
                                        }) => {
    try {
        const response = await api.post(endpoints.addLectureStaging(), data, {
            headers: {
                'Nodemy-Authentication': accessToken,
            },
        });
        const lecture: ResponseSuccess = {
            code: response.status,
            data: response.data,
        };
        return lecture;
    } catch (error) {
        const errorObj: ResponseError = {
            code: error.response.status,
            error: error.response.data.error,
        };

        return errorObj;
    }
};

export default addLectureStagingApi;
