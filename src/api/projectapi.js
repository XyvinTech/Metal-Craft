import { toast } from "react-toastify";
import axiosInstance from "./axiosIntercepter";

export const getSingleProject = async (id) => {
  try {
    const response = await axiosInstance.get(`/project/single/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
export const addProject = async (data) => {
  try {
    const response = await axiosInstance.post(`/project`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const addProjectFile = async (data) => {
    try {
      const response = await axiosInstance.post(`/project/upload`, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
export const getProject = async (filter) => {
  try {
    const response = await axiosInstance.get(`/project/list`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const editProject = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/project/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`/project/single/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
