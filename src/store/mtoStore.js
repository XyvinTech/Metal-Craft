import { create } from "zustand";
import { editMto, getMto, getSummary } from "../api/mtoapi";

const useMtoStore = create((set) => ({
  lists: [],
  summary: [],
  sumColumn: [],
  totalCount: 0,
  project: "",
  columns: [],
  loading: false,
  editable: [],
  balanceIss: "",
  balanceStock: "",

  getMtoByProject: async (id, filter) => {
    set({ loading: true });
    const allData = await getMto(id, filter);
    set({ totalCount: allData?.totalCount || 0 });
    set({ editable: allData?.data?.editableHeaders || [] });
    set({ lists: allData?.data?.data || [] });
    set({ balanceIss: allData?.data?.balanceToIssue || 0 });
    set({ balanceStock: allData?.data?.balanceQty || 0 });
    set({ columns: allData?.data?.headers || [] });
    set({ project: allData?.data?.project || "" });
    set({ loading: false });
  },
  updateMto: async (id, data, filter) => {
    await editMto(id, data, filter);
  },
  getSummarys: async (id, filter) => {
    set({ loading: true });
    const allData = await getSummary(id, filter);
    set({ totalCount: allData?.data?.totalCount || 0 });
    set({ summary: allData?.data?.mtoData || [] });
    set({ sumColumn: allData?.data?.selectedHeaders || [] });
    set({ loading: false });
  },
}));

export { useMtoStore };
