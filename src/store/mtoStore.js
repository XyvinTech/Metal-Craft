import { create } from "zustand";
import { editMto, getMto, getSummary } from "../api/mtoapi";

const useMtoStore = create((set) => ({
  lists: [],
  totalCount: 0,
  project: "",
  columns: [],
  loading: false,

  getMtoByProject: async (id, filter) => {
    set({ loading: true });
    const allData = await getMto(id, filter);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.data?.data || [] });
    set({ columns: allData?.data?.headers || [] });
    set({ project: allData?.data?.project || "" });
    set({ loading: false });
  },
  updateMto: async (id, data) => {
    await editMto(id, data);
  },
  getSummarys: async (id, filter) => {
    set({ loading: true });
    const allData = await getSummary(id, filter);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.data?.mtoData || [] });
    set({ columns: allData?.data?.selectedHeaders || [] });
    set({ loading: false });
  },
}));

export { useMtoStore };
