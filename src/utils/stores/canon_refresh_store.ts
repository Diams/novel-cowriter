import { create } from "zustand";

interface CanonRefreshStore {
  refresh_trigger: number;
  trigger_refresh: () => void;
}

export const useCanonRefreshStore = create<CanonRefreshStore>((set) => ({
  refresh_trigger: 0,
  trigger_refresh: () =>
    set((state) => ({ refresh_trigger: state.refresh_trigger + 1 })),
}));
