"use client";

import { useState } from "react";
import Button from "@/components/actions/button";
import Canon from "@/components/actions/canon";
import SelectableCard from "@/components/actions/selectable_card";
import Pane from "@/components/containers/pane";
import SelectableCardContainer from "@/components/containers/selectable_card_container";
import Tab from "@/components/containers/tab";
import Badge from "@/components/displays/badge";

export default function LeftPane() {
  const [n_selected_items, set_n_selected_items] = useState<number>(0);
  const [selected_item, set_selected_item] = useState<number>(1);
  const [is_ai_referenceds, set_is_ai_referenceds] = useState<boolean[]>([
    false,
    false,
  ]);

  return (
    <Pane className="h-full bg-linear-to-b from-[rgba(16,24,40,0.72)] to-[rgba(16,24,40,0.5)] shadow-black/35 overflow-hidden">
      <Pane.Title className="bg-[rgba(15,23,42,0.55)]">
        <h2 className="text-sm font-extrabold">設定集／本編</h2>
      </Pane.Title>
      <Pane.Content className="text-sm overflow-y-auto">
        <Tab default_value="settings">
          <Tab.List className="font-bold">
            <Tab.Trigger value="settings">設定</Tab.Trigger>
            <Tab.Trigger value="story">本編</Tab.Trigger>
          </Tab.List>
          <Tab.CommonContent>
            <div className="space-y-2">
              <div>
                <Badge text={`AI参照：${n_selected_items}件`} />
              </div>
              <div className="flex justify-end items-center gap-2">
                <Button text="追加" icon_name="IconPlus" />
                <Button text="全選択" />
                <Button text="全解除" />
              </div>
            </div>
          </Tab.CommonContent>
          <Tab.Content value="settings">
            <SelectableCardContainer
              className="w-full space-y-2"
              onSelectedChange={set_selected_item}
            >
              <SelectableCard className="w-full">
                <Canon
                  title="世界観 / テーマ"
                  description="トーン・舞台・禁則"
                  version={12}
                  is_ai_referenced={is_ai_referenceds[0]}
                  onAiReferencedChange={(checked) => {
                    const new_states = [...is_ai_referenceds];
                    new_states[0] = checked;
                    set_is_ai_referenceds(new_states);
                    set_n_selected_items(
                      new_states.filter((state) => state).length
                    );
                  }}
                />
              </SelectableCard>
              <SelectableCard className="w-full">
                <Canon
                  title="人物設定"
                  description="主人公/相棒/敵役"
                  version={9}
                  is_ai_referenced={is_ai_referenceds[1]}
                  onAiReferencedChange={(checked) => {
                    const new_states = [...is_ai_referenceds];
                    new_states[1] = checked;
                    set_is_ai_referenceds(new_states);
                    set_n_selected_items(
                      new_states.filter((state) => state).length
                    );
                  }}
                />
              </SelectableCard>
            </SelectableCardContainer>
          </Tab.Content>
          <Tab.Content value="story">
            <p>This is the content of Tab 2.</p>
          </Tab.Content>
        </Tab>
      </Pane.Content>
    </Pane>
  );
}
