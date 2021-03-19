import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const banUserAPI = async (accessToken: string, userId: string) => {
    try {
        const res = await api.patch(endpoints.banUserEndpoint(), { userId }, {
            headers: {
                'Nodemy-Authentication': accessToken,
            },
        });
        const allUsers: ResponseSuccess = {
            code: res.status,
            data: {},
        };
        return allUsers;
    } catch (err) {
        const errorObj: ResponseError = {
            code: err.response.status,
            error: '',
        };
        return errorObj;
    }
}

export default banUserAPI;