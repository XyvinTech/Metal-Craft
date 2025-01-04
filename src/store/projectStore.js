import { create } from "zustand";
import {
  addProject,
  deleteProject,
  editProject,
  getProject,
  getSingleProject,
} from "../api/projectapi";

const useProjectStore = create((set) => ({
  projects: [],
  singleProject: [],
  lastProjectId: null,
  totalCount: 0,
  formData: {},
  setFormData: (data) => set({ formData: data }),
  filters: {},
  setFilters: (filter) => set({ filters: filter }),
  sortColumn: "", // New state for column
  sortOrder: "", // New state for order
  setSortColumn: (column) => set({ sortColumn: column }), // Setter for column
  setSortOrder: (order) => set({ sortOrder: order }),
  addProjects: async (data) => {
    const response = await addProject(data);
    const projectId = response?.data?._id;

    set({ lastProjectId: projectId });
    return response;
  },
  getProjects: async (filter) => {
    const response = await getProject(filter);
    set({ projects: response.data || [] });
    set({ totalCount: response.totalCount || 0 });
  },

  fetchProjectById: async (id) => {
    const response = await getSingleProject(id);
    set({ singleProject: response.data || [] });
  },

  updateProject: async (id, data) => {
    await editProject(id, data);
  },
  deleteProjects: async (id) => {
    await deleteProject(id);
  },
}));

export { useProjectStore };
