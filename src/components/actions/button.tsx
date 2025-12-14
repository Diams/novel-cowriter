import * as TablerIcons from "@tabler/icons-react";
import { ComponentType, MouseEvent } from "react";
import { parseColor } from "@/utils/functions";

export default function Button({
  text = "button",
  icon_name,
  bg_color = "[#111C2F]/25",
  hover_bg_color = "[#111C2F]/80",
  text_size = 12,
  text_color = "white/92",
  border_color = "white/10",
  hover_border_color = "white/16",
  onClick,
}: {
  text?: string;
  icon_name?: keyof typeof TablerIcons;
  bg_color?: string;
  hover_bg_color?: string;
  text_size?: number;
  text_color?: string;
  border_color?: string;
  hover_border_color?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const Icon = icon_name
    ? (TablerIcons[icon_name] as ComponentType<{ size?: number }>)
    : null;
  return (
    <button
      className={`flex border rounded-xl py-2 px-3 items-center align-middle cursor-pointer hover:-translate-y-px transition-all duration-150`}
      style={{
        fontSize: `${text_size}px`,
        backgroundColor: parseColor(bg_color),
        color: parseColor(text_color),
        borderColor: parseColor(border_color),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = parseColor(hover_bg_color);
        e.currentTarget.style.borderColor = parseColor(hover_border_color);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = parseColor(bg_color);
        e.currentTarget.style.borderColor = parseColor(border_color);
      }}
      onClick={onClick}
    >
      {Icon && <Icon size={16} />}
      {text}
    </button>
  );
}
