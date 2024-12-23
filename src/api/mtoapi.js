import { toast } from "react-toastify";
import axiosInstance from "./axiosIntercepter";

export const getMto = async (id, filter) => {
  try {
    const response = await axiosInstance.get(`/mto/single/${id}`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
export const editMto = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/mto/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const addUploadFile = async (data) => {
  try {
    const response = await axiosInstance.post(`/mto/upload`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getDownload = async () => {
  try {
    const response = await axiosInstance.get(`/mto/download`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getSummary = async (id) => {
  try {
    const response = await axiosInstance.get(`/mto/summary/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const getAlarm = async (id) => {
  try {
    const response = await axiosInstance.get(`/mto/alarm/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
