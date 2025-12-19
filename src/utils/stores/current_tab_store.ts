import { create } from "zustand";

interface CurrentTabStore {
  current_tab: "settings" | "story";
  set_current_tab: (value: "settings" | "story") => void;
}

export const useCurrentTabStore = create<CurrentTabStore>((set) => ({
  current_tab: "settings",
  set_current_tab: (value) => set({ current_tab: value }),
}));
