import { create } from "zustand";
import { getMto } from "../api/mtoapi";

const useMtoStore = create((set) => ({
  lists: [],
  totalCount: 0,

  getMtoByProject: async (id) => {
    const allData = await getMto(id);
    set({ totalCount: allData?.totalCount || 0 });
    set({ lists: allData?.data || [] });
  },
}));

export { useMtoStore };
