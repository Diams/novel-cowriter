"use client";

import { useEffect, useState } from "react";
import Button from "@/components/actions/button";
import Pane from "@/components/containers/pane";
import Tab from "@/components/containers/tab";
import Badge from "@/components/displays/badge";
import {
  CreateCanon,
  DeleteCanon,
  GetCanonsByType,
  UpdateCanon,
} from "@/utils/data_accessor/canon_data_accessor";
import { CanonData } from "@/utils/data_type";
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
  const [current_tab_value, set_current_tab_value] = useState<
    "settings" | "story"
  >(default_tab_value);
  const [canons_settings, set_canons_settings] = useState<CanonData[]>([]);
  const [selected_settings, set_selected_settings] = useState<string>("");
  const [is_ai_referenceds_settings, set_is_ai_referenceds_settings] =
    useState<{ [id: string]: boolean }>({});
  const [canons_story, set_canons_story] = useState<CanonData[]>([]);
  const [selected_story, set_selected_story] = useState<string>("");
  const [is_ai_referenceds_story, set_is_ai_referenceds_story] = useState<{
    [id: string]: boolean;
  }>({});
  const handle_update_canons = () => {
    const canons_settings = GetCanonsByType("settings");
    const canons_story = GetCanonsByType("story");
    set_canons_settings(canons_settings);
    set_canons_story(canons_story);
  };
  useEffect(handle_update_canons, []);
  return (
    <Pane className="h-full bg-linear-to-b from-[rgba(16,24,40,0.72)] to-[rgba(16,24,40,0.5)] shadow-black/35 overflow-hidden">
      <Pane.Title className="bg-[rgba(15,23,42,0.55)]">
        <h2 className="text-sm font-extrabold">設定集／本編</h2>
      </Pane.Title>
      <Pane.Content className="text-sm overflow-y-auto">
        <Tab
          default_value={default_tab_value}
          onValueChange={(value) => {
            if (value === "settings" || value === "story") {
              set_current_tab_value(value);
            }
          }}
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
          <Tab.Content value="settings">
            <CanonContainer
              canons={canons_settings}
              selected_canon={selected_settings}
              set_selected_canon={set_selected_settings}
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
                set_is_ai_referenceds_settings((prev) => ({
                  ...prev,
                  [id]: false,
                }));
                if (id === selected_settings) {
                  const updated = canons_settings.filter((c) => c.id !== id);
                  set_selected_settings(updated[0].id);
                }
                handle_update_canons();
              }}
            />
          </Tab.Content>
          <Tab.Content value="story">
            <CanonContainer
              canons={canons_story}
              selected_canon={selected_story}
              set_selected_canon={set_selected_story}
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
                set_is_ai_referenceds_story((prev) => ({
                  ...prev,
                  [id]: false,
                }));
                if (id === selected_story) {
                  const updated = canons_story.filter((c) => c.id !== id);
                  set_selected_story(updated[0].id);
                }
                handle_update_canons();
              }}
            />
          </Tab.Content>
        </Tab>
      </Pane.Content>
    </Pane>
  );
}
