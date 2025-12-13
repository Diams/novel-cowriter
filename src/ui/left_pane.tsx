import Pane from "@/components/pane/pane";

export default function LeftPane() {
  return (
    <Pane className="h-full bg-linear-to-b from-[rgba(16,24,40,0.72)] to-[rgba(16,24,40,0.5)] shadow-black/35 overflow-hidden">
      <Pane.Title className="bg-[rgba(15,23,42,0.55)]">
        <h2 className="text-sm font-extrabold">設定集／本編</h2>
      </Pane.Title>
      <Pane.Content className="text-xs overflow-y-auto">
        <div>ここにコンテンツが入ります。</div>
      </Pane.Content>
    </Pane>
  );
}
