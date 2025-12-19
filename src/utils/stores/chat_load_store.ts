import { create } from "zustand";

interface ChatLoadStore {
  load_trigger: number;
  trigger_load: () => void;
}

export const useChatLoadStore = create<ChatLoadStore>((set) => ({
  load_trigger: 0,
  trigger_load: () =>
    set((state) => ({ load_trigger: state.load_trigger + 1 })),
}));
