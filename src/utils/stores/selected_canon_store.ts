import { create } from "zustand";

interface SelectedCanonStore {
  selected_settings: string;
  selected_story: string;
  set_selected_settings: (id: string) => void;
  set_selected_story: (id: string) => void;
}

export const useSelectedCanonStore = create<SelectedCanonStore>((set) => ({
  selected_settings: "",
  selected_story: "",
  set_selected_settings: (id) => set({ selected_settings: id }),
  set_selected_story: (id) => set({ selected_story: id }),
}));
