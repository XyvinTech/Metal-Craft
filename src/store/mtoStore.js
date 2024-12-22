import { create } from "zustand";
import { editMto, getMto } from "../api/mtoapi";

const useMtoStore = create((set) => ({
  lists: [],
  totalCount: 0,

  getMtoByProject: async (id) => {
    const allData = await getMto(id);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.data || [] });
  },
   updateMto: async (id, data) => {
      await editMto(id, data);
    },
}));

export { useMtoStore };
