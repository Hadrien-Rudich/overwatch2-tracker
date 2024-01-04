import axios, { AxiosResponse, Method } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002/',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

export const fetchDataFromApi = async <T>(
  endpoint: string,
  method: Method
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request({
      url: endpoint,
      method,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postDataToApi = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchDataOnApi = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  try {
    console.log(endpoint);
    console.log(data);
    const response: AxiosResponse<T> = await api.patch(endpoint, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDataFromApi = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
