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
  const default_chat_messages: ChatMessageData[] = [
    {
      role: "system",
      content: `You are a writing assistant for a novel.

The following materials are CANON:
- Settings
- Story (finalized chapters)

Rules:
- You must NOT modify, rewrite, or contradict any canon material.
- You may only reference canon materials when making suggestions.
- All changes must be proposed as suggestions for the user's Draft.
- If you detect inconsistencies or contradictions with canon, clearly point them out.

Your role:
- Help the user improve their Draft.
- Propose new text, revisions, or ideas as suggestions.
- Respect the requested tone, style, and length.

Output:
- Write all outputs in Japanese unless explicitly requested otherwise.
- Do not present canon text as if you wrote it.
- Do not assume missing information; note uncertainties when needed.
`,
    },
  ];
  const [chat_messages, set_chat_messages] = useState<ChatMessageData[]>(
    default_chat_messages
  );
  const [chat_input, set_chat_input] = useState<string>("");
  const [is_loaded, set_is_loaded] = useState(false);

  // 初回マウント時にlocalStorageから復元
  useEffect(() => {
    const saved = localStorage.getItem("chat_messages");
    if (saved) {
      try {
        set_chat_messages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved chat messages:", e);
      }
    }
    set_is_loaded(true);
  }, []);

  // chat_messagesが更新されたらlocalStorageに保存（初回ロード後のみ）
  useEffect(() => {
    if (is_loaded) {
      localStorage.setItem("chat_messages", JSON.stringify(chat_messages));
    }
  }, [chat_messages, is_loaded]);

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
          onClick={async () => {
            const trimed_chat_input = chat_input.trim();
            if (trimed_chat_input === "") return;

            // ユーザーメッセージを追加
            const new_user_message: ChatMessageData = {
              role: "user",
              content: trimed_chat_input,
            };
            set_chat_messages((prev) => [...prev, new_user_message]);
            set_chat_input("");

            // AIメッセージの初期化（空のメッセージを追加）
            const ai_message_index = chat_messages.length + 1;
            set_chat_messages((prev) => [
              ...prev,
              { role: "assistant", content: "" },
            ]);

            try {
              // Chat APIを呼び出し
              const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  messages: [...chat_messages, new_user_message],
                }),
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              // ストリーミングレスポンスを処理
              const reader = response.body?.getReader();
              const decoder = new TextDecoder();

              if (reader) {
                let accumulated_content = "";

                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;

                  const chunk = decoder.decode(value);
                  const lines = chunk.split("\n");

                  for (const line of lines) {
                    if (line.startsWith("data: ")) {
                      const data = JSON.parse(line.slice(6));
                      accumulated_content += data.content;

                      // AIメッセージを更新
                      set_chat_messages((prev) => {
                        const new_messages = [...prev];
                        new_messages[ai_message_index] = {
                          role: "assistant",
                          content: accumulated_content,
                        };
                        return new_messages;
                      });
                    }
                  }
                }
              }
            } catch (error) {
              console.error("Error calling chat API:", error);
              // エラーメッセージを表示
              set_chat_messages((prev) => {
                const new_messages = [...prev];
                new_messages[ai_message_index] = {
                  role: "assistant",
                  content: "エラーが発生しました。もう一度お試しください。",
                };
                return new_messages;
              });
            }
          }}
        />
      </Pane.Content>
    </Pane>
  );
}
