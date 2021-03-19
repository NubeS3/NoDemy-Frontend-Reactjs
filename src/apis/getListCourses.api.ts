import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getListCoursesApi = async (accessToken: string, title?: string, category?: string, sort?: string, page?: string) => {
  try {
    let getListCoursesEndpoint = endpoints.getListCourses();
    if (page) {
      if (parseInt(page).toString() === 'NaN') {
        getListCoursesEndpoint += `?page=1`;
      }
      else {
        getListCoursesEndpoint += `?page=${page}`;
      }
    }
    else {
      getListCoursesEndpoint += `?page=1`;
    }

    if (category) {
      getListCoursesEndpoint += `&category=${category}`;
    }

    if (title) {
      getListCoursesEndpoint += `&title=${title}`;
    }

    if (sort === 'ratings' || sort === 'price' || sort === 'ratings,price' || sort === 'price,ratings') {
      getListCoursesEndpoint += `&sort=${sort}`;
    }

    const response = await api.get(getListCoursesEndpoint, {
      headers: {
        'Nodemy-Authentication': accessToken,
      },
    });
    const coursesResponse: ResponseSuccess = {
      code: response.status,
      data: response.data,
    };
    return coursesResponse;
  }
  catch (error) {
    const errorObj: ResponseError = {
      code: error.response.status,
      error: error.response.data.error,
    };

    return errorObj;
  }
};

export default getListCoursesApi;
