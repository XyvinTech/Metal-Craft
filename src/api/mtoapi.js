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
export const editMto = async (id, data,filter) => {
  try {
    const response = await axiosInstance.put(`/mto/single/${id}`, data,{
      params: filter
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const addUploadFile = async (data) => {
  try {
    const response = await axiosInstance.put(`/mto/bulkupdate`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getDownload = async (id) => {
  try {
    const response = await axiosInstance.get(`/mto/download/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getSummary = async (id, filter) => {
  try {
    const response = await axiosInstance.get(`/mto/summery/${id}`, {
      params: filter
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
export const getSummaryDownload = async (id) => {
  try {
    const response = await axiosInstance.get(`/mto/summery/download/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

