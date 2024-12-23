import { create } from "zustand";
import { getAdmin, getAlarm, getLogs } from "../api/adminapi";
import { getSummary } from "../api/mtoapi";

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
  getSummarys: async (id) => {
    set({ loading: true });
    const allData = await getSummary(id);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.data || [] });
    set({ loading: false });
  },
  getAlarms: async (id) => {
    set({ loading: true });
    const allData = await getAlarm(id);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.data || [] });
    set({ loading: false });
  },
}));

export { useListStore };
