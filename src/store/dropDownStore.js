import { create } from "zustand";
import { getProject } from "../api/projectapi";
const useDropDownStore = create((set) => ({
  project: [],

  fetchListofProject: async () => {
    const allData = await getProject();
    set({ project: allData?.data || [] });
  },
}));

export { useDropDownStore };
