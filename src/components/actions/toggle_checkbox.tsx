import { parseColor } from "@/utils/functions";

export default function ToggleCheckbox({
  text,
  bg_color = "[#111C2F]/25",
  text_size = 11,
  text_color = "white/92",
  border_color = "white/10",
  is_checked = false,
  onCheckedChange,
}: {
  text?: string;
  bg_color?: string;
  text_size?: number;
  text_color?: string;
  border_color?: string;
  is_checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <div
      className="flex border rounded-xl py-2 px-3"
      style={{
        fontSize: `${text_size}px`,
        backgroundColor: parseColor(bg_color),
        color: parseColor(text_color),
        borderColor: parseColor(border_color),
      }}
    >
      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          style={{ accentColor: "var(--good)" }}
          checked={is_checked}
          onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
        />
        {text}
      </label>
    </div>
  );
}
