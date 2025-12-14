"use client";

import Button from "@/components/actions/button";
import Pane from "@/components/containers/pane";
import Badge from "@/components/displays/badge";

export default function CenterPane() {
  return (
    <Pane className="flex flex-col h-full bg-linear-to-b from-[rgba(16,24,40,0.72)] to-[rgba(16,24,40,0.5)] shadow-black/35 overflow-hidden">
      <Pane.Title className="flex bg-[rgba(15,23,42,0.55)]">
        <div>
          <h2 className="text-sm font-extrabold">作業スペース</h2>
          <div className="text-xs text-muted">素材：</div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Badge text="原稿用文字数：" text_size={13} text_color="white/85" />
          <Button text="保存" />
          <Button text="クリア" />
        </div>
      </Pane.Title>
      <Pane.Content className="flex-1 text-sm overflow-auto">
        <textarea className="w-full border rounded-2xl min-h-130 p-3.5 outline-0" />
      </Pane.Content>
    </Pane>
  );
}
