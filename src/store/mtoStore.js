import { create } from "zustand";
import { editMto, getMto, getSummary } from "../api/mtoapi";

const useMtoStore = create((set) => ({
  lists: [],
  totalCount: 0,
  project: '',
  columns:[],

  getMtoByProject: async (id,filter) => {
    const allData = await getMto(id, filter);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.data?.data || [] });
    set({ columns: allData?.data?.headers || [] });
    set({ project: allData?.data?.project || '' });
  },
   updateMto: async (id, data) => {
      await editMto(id, data);
    },
     getSummarys: async (id, filter) => {
        const allData = await getSummary(id, filter);
        set({ totalCount: allData?.totalCount || 0 });
        set({ lists: allData?.data?.mtoData|| [] });
        set({ columns: allData?.data?.selectedHeaders || [] });
      },
}));

export { useMtoStore };
