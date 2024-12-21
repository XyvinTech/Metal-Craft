import axiosInstance from "./axiosIntercepter";

export const getMto = async (id) => {
    try {
      const response = await axiosInstance.get(`/mto/single/${id}`);
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
    }
  };