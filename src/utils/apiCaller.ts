import { AxiosRequestConfig, Method } from 'axios';

import api from './api';


interface ApiCallParams<T = any> {
  method: Method;
  url: string;
  data?: T;
  params?: Record<string, any>;
  config?: AxiosRequestConfig;
}

const apiCaller = async <TResponse = any, TRequest = any>({
  method,
  url,
  data,
  params,
  config = {},
}: ApiCallParams<TRequest>): Promise<TResponse> => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
      ...config,
    });
    return response.data as TResponse;
  } catch (error: any) {
    console.error('API Error:', error);
    throw error?.response?.data || { message: 'Unexpected error occurred' };
  }
};

export default apiCaller;
