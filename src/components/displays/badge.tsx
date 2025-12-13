export default function Badge({
  text = "badge",
  bg_color = "black/16",
  border_color = "white/14",
  text_size = "[11px]",
  text_color = "white/80",
}: {
  text?: string;
  bg_color?: string;
  border_color?: string;
  text_size?: string;
  text_color?: string;
}) {
  return (
    <span
      className={`bg-${bg_color} border border-${border_color} text-${text_size} text-${text_color} rounded-[999px] whitespace-nowrap py-1 px-2`}
    >
      {text}
    </span>
  );
}
