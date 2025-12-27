import { create } from "zustand";

interface WorkspaceStore {
  is_unsaved: boolean;
  set_is_unsaved: (is_unsaved: boolean) => void;
  save_workspace: (() => void) | null;
  set_save_workspace: (save_fn: (() => void) | null) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  is_unsaved: false,
  set_is_unsaved: (is_unsaved) => set({ is_unsaved }),
  save_workspace: null,
  set_save_workspace: (save_fn) => set({ save_workspace: save_fn }),
}));
