"use client";

import Button from "@/components/actions/button";
import Pane from "@/components/containers/pane";
import Badge from "@/components/displays/badge";
import { useAIReferencesStore } from "@/utils/stores/ai_referrences_store";

export default function RightPane() {
  const ai_referenced_settings = useAIReferencesStore(
    (state) => state.ai_referenced_settings
  );
  const ai_referenced_story = useAIReferencesStore(
    (state) => state.ai_referenced_story
  );
  return (
    <Pane className="flex flex-col h-full bg-linear-to-b from-[rgba(16,24,40,0.72)] to-[rgba(16,24,40,0.5)] shadow-black/35 overflow-hidden">
      <Pane.Title className="bg-[rgba(15,23,42,0.55)]">
        <h2 className="text-sm font-extrabold">AIチャット</h2>
      </Pane.Title>
      <Pane.Content className="flex flex-col text-sm gap-2">
        <div className="flex">
          <h2 className="text-xs font-extrabold">AI参照</h2>
          <p className="text-[11px] text-muted">
            （設定{Object.values(ai_referenced_settings).filter(Boolean).length}{" "}
            / 本編{Object.values(ai_referenced_story).filter(Boolean).length}）
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge text="（参照なし：チェックで追加）" />
        </div>
      </Pane.Content>
      <Pane.Content className="flex flex-col flex-1 text-sm overflow-hidden gap-3">
        <h2 className="text-xs font-extrabold">チャットログ</h2>
        <div className="overflow-auto space-y-2">
          <div className="bg-good/8 text-xs border border-good/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">あなた</h3>
            <p>ここにチャットログが表示されます。緑色はユーザの発言です。</p>
          </div>
          <div className="bg-accent/8 text-xs border border-accent/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">AIアシスタント</h3>
            <p>ここにチャットログが表示されます。紫色はAIの発言です。</p>
          </div>
          <div className="bg-good/8 text-xs border border-good/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">あなた</h3>
            <p>ここにチャットログが表示されます。緑色はユーザの発言です。</p>
          </div>
          <div className="bg-accent/8 text-xs border border-accent/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">AIアシスタント</h3>
            <p>ここにチャットログが表示されます。紫色はAIの発言です。</p>
          </div>
          <div className="bg-good/8 text-xs border border-good/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">あなた</h3>
            <p>ここにチャットログが表示されます。緑色はユーザの発言です。</p>
          </div>
          <div className="bg-accent/8 text-xs border border-accent/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">AIアシスタント</h3>
            <p>ここにチャットログが表示されます。紫色はAIの発言です。</p>
          </div>
          <div className="bg-good/8 text-xs border border-good/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">あなた</h3>
            <p>ここにチャットログが表示されます。緑色はユーザの発言です。</p>
          </div>
          <div className="bg-accent/8 text-xs border border-accent/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">AIアシスタント</h3>
            <p>ここにチャットログが表示されます。紫色はAIの発言です。</p>
          </div>
          <div className="bg-good/8 text-xs border border-good/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">あなた</h3>
            <p>ここにチャットログが表示されます。緑色はユーザの発言です。</p>
          </div>
          <div className="bg-accent/8 text-xs border border-accent/35 rounded-xl py-2 px-3 space-y-2">
            <h3 className="font-extrabold">AIアシスタント</h3>
            <p>ここにチャットログが表示されます。紫色はAIの発言です。</p>
          </div>
        </div>
      </Pane.Content>
      <Pane.Content className="text-sm gap-2">
        <textarea className="w-full border rounded-2xl p-3.5 outline-0" />
        <Button
          text="送信"
          bg_color="accent/95"
          hover_bg_color="accent/85"
          border_color="accent/45"
          hover_border_color="accent/45"
        />
      </Pane.Content>
    </Pane>
  );
}
