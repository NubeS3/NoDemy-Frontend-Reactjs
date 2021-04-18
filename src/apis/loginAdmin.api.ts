import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

export type LoginAdminBody = {
    adminUsername: string;
    password: string;
};

const loginAdminApi = async (credentials: LoginAdminBody) => {
    try {
        const response = await api.post(endpoints.loginAdmin(), credentials);
        const responseUser: ResponseSuccess = {
            code: response.status,
            data: response.data,
        };
        return responseUser;
    }
    catch (error) {
        const errorObj: ResponseError = {
            code: error.response.status,
            error: error.response.data.error,
        };

        return errorObj;
    }
};

export default loginAdminApi;
