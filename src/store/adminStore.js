import { create } from "zustand";
import {
  addAdmin,
  deleteAdmin,
  editAdmin,
  getAdminById,
  getDashboardData,
  getSingleAdmin,
} from "../api/adminapi";

const useAdminStore = create((set) => ({
  singleAdmin: [],
  single: [],
  dashboard: [],
  addAdmins: async (data) => {
    await addAdmin(data);
  },

  fetchAdminById: async () => {
    const response = await getAdminById();
    set({ singleAdmin: response.data || [] });
  },
  fetchSingleAdmin: async (id) => {
    const response = await getSingleAdmin(id);
    set({ single: response.data || [] });
  },
  fetchDashboard: async () => {
    const response = await getDashboardData();
    set({ dashboard: response.data || [] });
  },
  updateAdmin: async (id, data) => {
    await editAdmin(id, data);
  },
  deleteAdmins: async (id) => {
    await deleteAdmin(id);
  },
}));

export { useAdminStore };
