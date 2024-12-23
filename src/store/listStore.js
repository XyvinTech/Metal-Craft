import { create } from "zustand";
import { getAdmin, getLogs } from "../api/adminapi";

const useListStore = create((set) => ({
  lists: [],
  loading: false,
  totalCount: 0,

  getAdmins: async (filter) => {
    set({ loading: true });
    const allData = await getAdmin(filter);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.data || [] });
    set({ loading: false });
  },
  getLog: async (filter) => {
    set({ loading: true });
    const allData = await getLogs(filter);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.logs || [] });
    set({ loading: false });
  },
}));

export { useListStore };
