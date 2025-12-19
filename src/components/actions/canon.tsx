import Button from "@/components/actions/button";
import ToggleCheckbox from "@/components/actions/toggle_checkbox";
import Badge from "@/components/displays/badge";

export default function Canon({
  id = "",
  title = "",
  description = "",
  version = 0,
  is_ai_referenced = false,
  onAiReferencedChange,
  onClickEdit,
  onClickDelete,
}: {
  id?: string;
  title?: string;
  description?: string;
  version?: number;
  is_ai_referenced?: boolean;
  onAiReferencedChange?: (checked: boolean) => void;
  onClickEdit?: (id: string) => void;
  onClickDelete?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-1.5">
      <div className="flex">
        <div className="flex-1 text-left">{title}</div>
        <div>
          <Badge text={`v${version}`} />
        </div>
      </div>
      <div className="text-[11px] text-muted text-left">{description}</div>
      <div className="flex gap-2">
        <ToggleCheckbox
          text="AI参照"
          is_checked={is_ai_referenced}
          onCheckedChange={onAiReferencedChange}
        />
        <Button
          text=""
          icon_name="IconPencil"
          icon_size={11}
          onClick={(e) => {
            e.stopPropagation();
            onClickEdit && onClickEdit(id);
          }}
        />
        <Button
          text=""
          icon_name="IconTrash"
          icon_size={11}
          hover_bg_color="danger/18"
          hover_border_color="danger/35"
          onClick={(e) => {
            e.stopPropagation();
            onClickDelete && onClickDelete(id);
          }}
        />
      </div>
    </div>
  );
}
