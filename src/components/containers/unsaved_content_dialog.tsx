import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/actions/button";

export default function UnsavedContentDialog({
  open,
  onSave,
  onDiscard,
  onCancel,
}: {
  open: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1E293B] border border-white/20 rounded-2xl shadow-2xl p-6 z-50 max-w-md w-full">
          <Dialog.Title className="text-lg font-bold text-white mb-4">
            未保存の変更
          </Dialog.Title>
          <Dialog.Description className="text-sm text-white/80 mb-6">
            未保存の内容があります。保存しますか？
          </Dialog.Description>
          <div className="flex gap-3 justify-end">
            <Button
              text="キャンセル"
              onClick={onCancel}
              bg_color="white/10"
              hover_bg_color="white/20"
            />
            <Button
              text="保存しない"
              onClick={onDiscard}
              bg_color="danger/20"
              hover_bg_color="danger/40"
            />
            <Button
              text="保存する"
              onClick={onSave}
              bg_color="blue-600/60"
              hover_bg_color="blue-600/80"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
