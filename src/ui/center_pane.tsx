"use client";

import { useEffect, useState } from "react";
import Button from "@/components/actions/button";
import Pane from "@/components/containers/pane";
import Badge from "@/components/displays/badge";
import {
  GetCanonById,
  UpdateCanon,
} from "@/utils/data_accessor/canon_data_accessor";
import { useCanonRefreshStore } from "@/utils/stores/canon_refresh_store";
import { useCurrentTabStore } from "@/utils/stores/current_tab_store";
import { useSelectedCanonStore } from "@/utils/stores/selected_canon_store";

export default function CenterPane() {
  const current_tab_value = useCurrentTabStore((state) => state.current_tab);
  const selected_settings = useSelectedCanonStore(
    (state) => state.selected_settings
  );
  const selected_story = useSelectedCanonStore((state) => state.selected_story);
  const trigger_refresh = useCanonRefreshStore(
    (state) => state.trigger_refresh
  );
  const [selected_canon_title, set_selected_canon_title] = useState<string>("");
  const [selected_canon_content, set_selected_canon_content] =
    useState<string>("");
  const [saved_canon_content, set_saved_canon_content] = useState<string>("");
  const is_unsaved = selected_canon_content !== saved_canon_content;
  
  useEffect(() => {
    if (current_tab_value === "settings") {
      const selected_canon = GetCanonById(selected_settings);
      if (selected_canon) {
        set_selected_canon_title(selected_canon.title);
        set_selected_canon_content(selected_canon.content);
        set_saved_canon_content(selected_canon.content);
      } else {
        set_selected_canon_title("");
        set_selected_canon_content("");
        set_saved_canon_content("");
      }
    } else {
      const selected_canon = GetCanonById(selected_story);
      if (selected_canon) {
        set_selected_canon_title(selected_canon.title);
        set_selected_canon_content(selected_canon.content);
        set_saved_canon_content(selected_canon.content);
      } else {
        set_selected_canon_title("");
        set_selected_canon_content("");
        set_saved_canon_content("");
      }
    }
  }, [current_tab_value, selected_settings, selected_story]);
  return (
    <Pane className="flex flex-col h-full bg-linear-to-b from-[rgba(16,24,40,0.72)] to-[rgba(16,24,40,0.5)] shadow-black/35 overflow-hidden">
      <Pane.Title className="flex bg-[rgba(15,23,42,0.55)]">
        <div>
          <h2 className="text-sm font-extrabold">作業スペース</h2>
          <div className="text-xs text-muted">素材：{selected_canon_title}</div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Badge
            text={`原稿用文字数：${selected_canon_content.length}`}
            text_size={13}
            text_color="white/85"
          />
          <Button
            text="保存"
            end_indicator_icon_name={is_unsaved ? "IconCircleFilled" : undefined}
            end_indicator_icon_size={12}
            end_indicator_icon_color="white"
            onClick={() => {
              UpdateCanon(
                current_tab_value === "settings"
                  ? selected_settings
                  : selected_story,
                {
                  content: selected_canon_content,
                }
              );
              set_saved_canon_content(selected_canon_content);
              trigger_refresh();
            }}
          />
          <Button
            text="クリア"
            onClick={() => set_selected_canon_content("")}
          />
        </div>
      </Pane.Title>
      <Pane.Content className="flex-1 text-sm overflow-auto">
        <textarea
          value={selected_canon_content}
          onChange={(e) => set_selected_canon_content(e.target.value)}
          className="w-full border rounded-2xl min-h-130 p-3.5 outline-0"
        />
      </Pane.Content>
    </Pane>
  );
}
