import axios from "axios";

export const getData = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);

  return response.data;
};

export const postData = async <TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> => {
  const response = await axios.post<TResponse>(url, data);

  return response.data;
};

export const putData = async <T>(url: string): Promise<T> => {
  const response = await axios.put<T>(url);

  return response.data;
};

export const PutDataAsync = async <TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> => {
  const response = await axios.put<TResponse>(url, data);

  return response.data;
};

export const deleteData = async <T>(url: string): Promise<T> => {
  const response = await axios.delete<T>(url);

  return response.data;
};
