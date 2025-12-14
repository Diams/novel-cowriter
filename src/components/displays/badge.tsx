import { parseColor } from "@/utils/functions";

export default function Badge({
  text = "badge",
  bg_color = "black/16",
  border_color = "white/14",
  text_size = 11,
  text_color = "white/80",
}: {
  text?: string;
  bg_color?: string;
  border_color?: string;
  text_size?: number;
  text_color?: string;
}) {
  return (
    <span
      className="border rounded-[999px] whitespace-nowrap py-1 px-2"
      style={{
        backgroundColor: parseColor(bg_color),
        borderColor: parseColor(border_color),
        color: parseColor(text_color),
        fontSize: `${text_size}px`,
      }}
    >
      {text}
    </span>
  );
}
