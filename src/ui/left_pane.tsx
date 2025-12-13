"use client";

import { useState } from "react";
import Pane from "@/components/containers/pane";
import Tab from "@/components/containers/tab";
import Badge from "@/components/displays/badge";

export default function LeftPane() {
  const [n_selected_items, set_n_selected_items] = useState<number>(0);

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
            <Badge text={`AI参照：${n_selected_items}件`} />
          </Tab.CommonContent>
          <Tab.Content value="settings">
            <p>This is the content of Tab 1.</p>
          </Tab.Content>
          <Tab.Content value="story">
            <p>This is the content of Tab 2.</p>
          </Tab.Content>
        </Tab>
      </Pane.Content>
    </Pane>
  );
}
