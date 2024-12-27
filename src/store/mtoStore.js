import { create } from "zustand";
import { editMto, getMto } from "../api/mtoapi";

const useMtoStore = create((set) => ({
  lists: [],
  totalCount: 0,
  project: '',

  getMtoByProject: async (id,filter) => {
    const allData = await getMto(id, filter);
    set({ totalCount: allData?.data?.totalCount || 0 });
    set({ lists: allData?.data?.mto || [] });
    set({ project: allData?.data?.projectName || '' });
  },
   updateMto: async (id, data) => {
      await editMto(id, data);
    },
}));

export { useMtoStore };
