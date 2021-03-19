import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getAllUsers = async (accessToken: string) => {
    try {
        const res = await api.get(endpoints.getUsersEndPoint(), {
            headers: {
                'Nodemy-Authentication': accessToken,
            },
        });
        const allUsers: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return allUsers;
    } catch (err) {
        const errorObj: ResponseError = {
            code: err.response.status,
            error: err.response.data.error,
        };
        return errorObj;
    }
}

export default getAllUsers;