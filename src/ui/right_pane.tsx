"use client";

import { useEffect, useState } from "react";
import Button from "@/components/actions/button";
import ChatMessageContainer from "@/components/containers/chat_message_container";
import Pane from "@/components/containers/pane";
import Badge from "@/components/displays/badge";
import { GetCanonById } from "@/utils/data_accessor/canon_data_accessor";
import { CanonData, ChatMessageData } from "@/utils/data_type";
import { useAIReferencesStore } from "@/utils/stores/ai_referrences_store";

export default function RightPane() {
  const ai_referenced_settings = useAIReferencesStore(
    (state) => state.ai_referenced_settings
  );
  const ai_referenced_story = useAIReferencesStore(
    (state) => state.ai_referenced_story
  );
  const [ai_referenceds, set_ai_referenceds] = useState<CanonData[]>([]);
  const [chat_messages, set_chat_messages] = useState<ChatMessageData[]>([]);
  const [chat_input, set_chat_input] = useState<string>("");
  useEffect(() => {
    const new_ai_referenced_keys: string[] = [];
    new_ai_referenced_keys.push(
      ...Object.keys(ai_referenced_settings).filter(
        (key) => ai_referenced_settings[key]
      )
    );
    new_ai_referenced_keys.push(
      ...Object.keys(ai_referenced_story).filter(
        (key) => ai_referenced_story[key]
      )
    );
    const new_ai_referenced = new_ai_referenced_keys
      .map((k) => GetCanonById(k))
      .filter((canon): canon is CanonData => canon != null);
    set_ai_referenceds(new_ai_referenced);
  }, [ai_referenced_settings, ai_referenced_story]);
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
          {ai_referenceds.length > 0 ? (
            <>
              {ai_referenceds.map((c) => (
                <Badge key={c.id} text={c.title} />
              ))}
            </>
          ) : (
            <Badge text="（参照なし：チェックで追加）" />
          )}
        </div>
      </Pane.Content>
      <Pane.Content className="flex flex-col flex-1 text-sm overflow-hidden gap-3">
        <h2 className="text-xs font-extrabold">チャットログ</h2>
        <div className="overflow-auto space-y-2">
          <ChatMessageContainer chat_message={chat_messages} />
        </div>
      </Pane.Content>
      <Pane.Content className="text-sm gap-2">
        <textarea
          value={chat_input}
          onChange={(e) => set_chat_input(e.target.value)}
          className="w-full border rounded-2xl p-3.5 outline-0"
        />
        <Button
          text="送信"
          bg_color="accent/95"
          hover_bg_color="accent/85"
          border_color="accent/45"
          hover_border_color="accent/45"
          onClick={() => {
            if (chat_input.trim() === "") return;
            set_chat_messages((prev) => [
              ...prev,
              { role: "user", content: chat_input },
            ]);
            set_chat_input("");
          }}
        />
      </Pane.Content>
    </Pane>
  );
}
