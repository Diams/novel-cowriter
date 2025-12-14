import { KeyboardEvent, MouseEvent } from "react";
import { parseColor } from "@/utils/functions";

export default function SelectableCard({
  children,
  bg_color = "[#111C2F]/25",
  hover_bg_color = "[#111C2F]/80",
  selected_bg_color = "[#22C55E]/8",
  text_size = 12,
  text_color = "white/92",
  border_color = "white/10",
  hover_border_color = "white/16",
  selected_border_color = "[#22C55E]/35",
  is_selected = false,
  className = "",
  onClick,
}: {
  children?: React.ReactNode;
  bg_color?: string;
  hover_bg_color?: string;
  selected_bg_color?: string;
  text_size?: number;
  text_color?: string;
  border_color?: string;
  hover_border_color?: string;
  selected_border_color?: string;
  is_selected?: boolean;
  className?: string;
  onClick?: (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex border rounded-xl py-2 px-3 cursor-pointer hover:-translate-y-px transition-all duration-150 ${className}`}
      style={{
        fontSize: `${text_size}px`,
        backgroundColor: parseColor(is_selected ? selected_bg_color : bg_color),
        color: parseColor(text_color),
        borderColor: parseColor(
          is_selected ? selected_border_color : border_color
        ),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = parseColor(
          is_selected ? selected_bg_color : hover_bg_color
        );
        e.currentTarget.style.borderColor = parseColor(
          is_selected ? selected_border_color : hover_border_color
        );
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = parseColor(
          is_selected ? selected_bg_color : bg_color
        );
        e.currentTarget.style.borderColor = parseColor(
          is_selected ? selected_border_color : border_color
        );
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.(e);
        }
      }}
    >
      {children}
    </div>
  );
}
