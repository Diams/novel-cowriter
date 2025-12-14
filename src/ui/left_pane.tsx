"use client";

import { useState } from "react";
import Button from "@/components/actions/button";
import Pane from "@/components/containers/pane";
import Tab from "@/components/containers/tab";
import Badge from "@/components/displays/badge";
import { CreateCanon } from "@/utils/data_accessor/canon_data_accessor";
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
  const canons_settings: CanonData[] = [
    {
      id: crypto.randomUUID(),
      title: "世界観 / テーマ",
      description: "トーン・舞台・禁則",
      version: 12,
      content: "",
      type: "settings",
    },
    {
      id: crypto.randomUUID(),
      title: "人物設定",
      description: "主人公/相棒/敵役",
      version: 9,
      content: "",
      type: "settings",
    },
  ];
  const [selected_index_settings, set_selected_index_settings] =
    useState<number>(0);
  const [n_selected_items_settings, set_n_selected_items_settings] =
    useState<number>(0);
  const [is_ai_referenceds_settings, set_is_ai_referenceds_settings] = useState<
    boolean[]
  >([false, false]);
  const canons_story: CanonData[] = [
    {
      id: crypto.randomUUID(),
      title: "第1章：霧の駅",
      description: "確定稿（抜粋）",
      version: 12,
      content: "",
      type: "story",
    },
    {
      id: crypto.randomUUID(),
      title: "第2章：合言葉",
      description: "確定稿（抜粋）",
      version: 9,
      content: "",
      type: "story",
    },
    {
      id: crypto.randomUUID(),
      title: "第3章：夜の取引",
      description: "確定稿（抜粋）",
      version: 1,
      content: "",
      type: "story",
    },
  ];
  const [selected_index_story, set_selected_index_story] = useState<number>(0);
  const [n_selected_items_story, set_n_selected_items_story] =
    useState<number>(0);
  const [is_ai_referenceds_story, set_is_ai_referenceds_story] = useState<
    boolean[]
  >([false, false, false]);

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
                    n_selected_items_settings + n_selected_items_story
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
                  }}
                />
                <Button text="全選択" />
                <Button text="全解除" />
              </div>
            </div>
          </Tab.CommonContent>
          <Tab.Content value="settings">
            <CanonContainer
              canons={canons_settings}
              selected_index={selected_index_settings}
              set_selected_index={set_selected_index_settings}
              set_n_selected_items={set_n_selected_items_settings}
              is_ai_referenceds={is_ai_referenceds_settings}
              set_is_ai_referenceds={set_is_ai_referenceds_settings}
            />
          </Tab.Content>
          <Tab.Content value="story">
            <CanonContainer
              canons={canons_story}
              selected_index={selected_index_story}
              set_selected_index={set_selected_index_story}
              set_n_selected_items={set_n_selected_items_story}
              is_ai_referenceds={is_ai_referenceds_story}
              set_is_ai_referenceds={set_is_ai_referenceds_story}
            />
          </Tab.Content>
        </Tab>
      </Pane.Content>
    </Pane>
  );
}
