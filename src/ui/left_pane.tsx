"use client";

import { useEffect, useState } from "react";
import Button from "@/components/actions/button";
import Pane from "@/components/containers/pane";
import Tab from "@/components/containers/tab";
import Badge from "@/components/displays/badge";
import UnsavedContentDialog from "@/components/containers/unsaved_content_dialog";
import {
  CreateCanon,
  DeleteCanon,
  GetCanonsByType,
  UpdateCanon,
} from "@/utils/data_accessor/canon_data_accessor";
import { CanonData } from "@/utils/data_type";
import { useAIReferencesStore } from "@/utils/stores/ai_referrences_store";
import { useCanonRefreshStore } from "@/utils/stores/canon_refresh_store";
import { useCurrentTabStore } from "@/utils/stores/current_tab_store";
import { useSelectedCanonStore } from "@/utils/stores/selected_canon_store";
import { useWorkspaceStore } from "@/utils/stores/workspace_store";
import CanonContainer from "./left_pane/canon_container";

export default function LeftPane() {
  const default_tab_value = "settings";
  const new_item_default: {
    [key: string]: { message: string; title: string; description: string };
  } = {
    settings: {
      message: "新しい設定項目のタイトル",
      title: "新規設定",
      description: "（説明を後で）",
    },
    story: {
      message: "新しい本編アイテムのタイトル",
      title: "新章",
      description: "確定稿（新規）",
    },
  };
  const refresh_trigger = useCanonRefreshStore(
    (state) => state.refresh_trigger
  );
  const current_tab_value = useCurrentTabStore((state) => state.current_tab);
  const set_current_tab_value = useCurrentTabStore(
    (state) => state.set_current_tab
  );
  const [canons_settings, set_canons_settings] = useState<CanonData[]>([]);
  const selected_settings = useSelectedCanonStore(
    (state) => state.selected_settings
  );
  const set_selected_settings = useSelectedCanonStore(
    (state) => state.set_selected_settings
  );
  const is_ai_referenceds_settings = useAIReferencesStore(
    (state) => state.ai_referenced_settings
  );
  const set_is_ai_referenceds_settings = useAIReferencesStore(
    (state) => state.set_ai_referenced_settings
  );
  const [canons_story, set_canons_story] = useState<CanonData[]>([]);
  const selected_story = useSelectedCanonStore((state) => state.selected_story);
  const set_selected_story = useSelectedCanonStore(
    (state) => state.set_selected_story
  );
  const is_ai_referenceds_story = useAIReferencesStore(
    (state) => state.ai_referenced_story
  );
  const set_is_ai_referenceds_story = useAIReferencesStore(
    (state) => state.set_ai_referenced_story
  );
  const is_unsaved = useWorkspaceStore((state) => state.is_unsaved);
  const save_workspace = useWorkspaceStore((state) => state.save_workspace);
  const [show_unsaved_dialog, set_show_unsaved_dialog] = useState(false);
  const [pending_canon_id, set_pending_canon_id] = useState<string | null>(
    null
  );
  const [pending_canon_type, set_pending_canon_type] = useState<
    "settings" | "story" | null
  >(null);
  const handle_update_canons = (): {
    canons_settings: CanonData[];
    canons_story: CanonData[];
  } => {
    const canons_settings = GetCanonsByType("settings");
    const canons_story = GetCanonsByType("story");
    set_canons_settings(canons_settings);
    set_canons_story(canons_story);
    return { canons_settings, canons_story };
  };

  const handle_canon_switch = (
    new_canon_id: string,
    type: "settings" | "story"
  ) => {
    const current_canon_id =
      type === "settings" ? selected_settings : selected_story;

    // If switching to the same canon, do nothing
    if (new_canon_id === current_canon_id) {
      return;
    }

    // If there are unsaved changes, show dialog
    if (is_unsaved) {
      set_pending_canon_id(new_canon_id);
      set_pending_canon_type(type);
      set_show_unsaved_dialog(true);
    } else {
      // No unsaved changes, switch immediately
      if (type === "settings") {
        set_selected_settings(new_canon_id);
      } else {
        set_selected_story(new_canon_id);
      }
    }
  };

  const handle_save_and_switch = () => {
    if (save_workspace) {
      save_workspace();
    }
    if (pending_canon_type === "settings" && pending_canon_id) {
      set_selected_settings(pending_canon_id);
    } else if (pending_canon_type === "story" && pending_canon_id) {
      set_selected_story(pending_canon_id);
    }
    set_show_unsaved_dialog(false);
    set_pending_canon_id(null);
    set_pending_canon_type(null);
  };

  const handle_discard_and_switch = () => {
    if (pending_canon_type === "settings" && pending_canon_id) {
      set_selected_settings(pending_canon_id);
    } else if (pending_canon_type === "story" && pending_canon_id) {
      set_selected_story(pending_canon_id);
    }
    set_show_unsaved_dialog(false);
    set_pending_canon_id(null);
    set_pending_canon_type(null);
  };

  const handle_cancel_switch = () => {
    set_show_unsaved_dialog(false);
    set_pending_canon_id(null);
    set_pending_canon_type(null);
  };
  useEffect(() => {
    const { canons_settings, canons_story } = handle_update_canons();
    set_selected_settings(
      canons_settings.length > 0 ? canons_settings[0].id : ""
    );
    set_selected_story(canons_story.length > 0 ? canons_story[0].id : "");
  }, []);
  useEffect(() => {
    const { canons_settings, canons_story } = handle_update_canons();
    // 現在選択されているsettingsがリストに存在しない場合のみ、最初の要素を選択
    if (!canons_settings.find((c) => c.id === selected_settings)) {
      set_selected_settings(
        canons_settings.length > 0 ? canons_settings[0].id : ""
      );
    }
    // 現在選択されているstoryがリストに存在しない場合のみ、最初の要素を選択
    if (!canons_story.find((c) => c.id === selected_story)) {
      set_selected_story(canons_story.length > 0 ? canons_story[0].id : "");
    }
  }, [refresh_trigger]);
  return (
    <>
      <UnsavedContentDialog
        open={show_unsaved_dialog}
        onSave={handle_save_and_switch}
        onDiscard={handle_discard_and_switch}
        onCancel={handle_cancel_switch}
      />
      <Pane className="flex flex-col h-full bg-linear-to-b from-[rgba(16,24,40,0.72)] to-[rgba(16,24,40,0.5)] shadow-black/35 overflow-hidden">
      <Pane.Title className="bg-[rgba(15,23,42,0.55)]">
        <h2 className="text-sm font-extrabold">設定集／本編</h2>
      </Pane.Title>
      <Pane.Content className="flex-1 min-h-0 text-sm overflow-hidden">
        <Tab
          default_value={default_tab_value}
          onValueChange={(value) => {
            if (value === "settings" || value === "story") {
              set_current_tab_value(value);
            }
          }}
          className="h-full flex flex-col overflow-hidden"
        >
          <Tab.List className="font-bold">
            <Tab.Trigger value="settings">設定</Tab.Trigger>
            <Tab.Trigger value="story">本編</Tab.Trigger>
          </Tab.List>
          <Tab.CommonContent>
            <div className="space-y-2">
              <div>
                <Badge
                  text={`AI参照：${
                    Object.values(is_ai_referenceds_settings).filter(
                      (is_ai_referenced) => is_ai_referenced
                    ).length +
                    Object.values(is_ai_referenceds_story).filter(
                      (is_ai_referenced) => is_ai_referenced
                    ).length
                  }件`}
                />
              </div>
              <div className="flex justify-end items-center gap-2">
                <Button
                  text="追加"
                  icon_name="IconPlus"
                  onClick={() => {
                    const title = prompt(
                      new_item_default[current_tab_value].message,
                      new_item_default[current_tab_value].title
                    );
                    if (title) {
                      CreateCanon({
                        title: title,
                        description:
                          new_item_default[current_tab_value].description,
                        content: "",
                        type: current_tab_value,
                      });
                    }
                    handle_update_canons();
                  }}
                />
                <Button
                  text="全選択"
                  onClick={() => {
                    set_is_ai_referenceds_settings(
                      Object.fromEntries(
                        canons_settings.map((c) => [c.id, true])
                      )
                    );
                    set_is_ai_referenceds_story(
                      Object.fromEntries(canons_story.map((c) => [c.id, true]))
                    );
                  }}
                />
                <Button
                  text="全解除"
                  onClick={() => {
                    set_is_ai_referenceds_settings({});
                    set_is_ai_referenceds_story({});
                  }}
                />
              </div>
            </div>
          </Tab.CommonContent>
          <Tab.Content value="settings" className="flex-1 overflow-hidden">
            <CanonContainer
              canons={canons_settings}
              selected_canon={selected_settings}
              set_selected_canon={(id) => handle_canon_switch(id, "settings")}
              is_ai_referenceds={is_ai_referenceds_settings}
              set_is_ai_referenceds={set_is_ai_referenceds_settings}
              onEdited={(id: string, new_title: string, new_description) => {
                UpdateCanon(id, {
                  title: new_title,
                  description: new_description,
                });
                handle_update_canons();
              }}
              onDelete={(id: string) => {
                DeleteCanon(id);
                const new_states = { ...is_ai_referenceds_settings };
                new_states[id] = false;
                set_is_ai_referenceds_settings(new_states);
                if (id === selected_settings) {
                  const updated = canons_settings.filter((c) => c.id !== id);
                  set_selected_settings(
                    updated.length > 0 ? updated[0].id : ""
                  );
                }
                handle_update_canons();
              }}
            />
          </Tab.Content>
          <Tab.Content value="story" className="flex-1 overflow-hidden">
            <CanonContainer
              canons={canons_story}
              selected_canon={selected_story}
              set_selected_canon={(id) => handle_canon_switch(id, "story")}
              is_ai_referenceds={is_ai_referenceds_story}
              set_is_ai_referenceds={set_is_ai_referenceds_story}
              onEdited={(id: string, new_title: string, new_description) => {
                UpdateCanon(id, {
                  title: new_title,
                  description: new_description,
                });
                handle_update_canons();
              }}
              onDelete={(id: string) => {
                DeleteCanon(id);
                const new_states = { ...is_ai_referenceds_story };
                new_states[id] = false;
                set_is_ai_referenceds_story(new_states);
                if (id === selected_story) {
                  const updated = canons_story.filter((c) => c.id !== id);
                  set_selected_story(updated.length > 0 ? updated[0].id : "");
                }
                handle_update_canons();
              }}
            />
          </Tab.Content>
        </Tab>
      </Pane.Content>
    </Pane>
    </>
  );
}
