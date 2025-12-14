import { create } from "zustand";

interface AIReferencesStore {
  ai_referenced_settings: { [id: string]: boolean };
  ai_referenced_story: { [id: string]: boolean };
  set_ai_referenced_settings: (value: { [id: string]: boolean }) => void;
  set_ai_referenced_story: (value: { [id: string]: boolean }) => void;
}

export const useAIReferencesStore = create<AIReferencesStore>((set) => ({
  ai_referenced_settings: {},
  ai_referenced_story: {},
  set_ai_referenced_settings: (value) => set({ ai_referenced_settings: value }),
  set_ai_referenced_story: (value) => set({ ai_referenced_story: value }),
}));
