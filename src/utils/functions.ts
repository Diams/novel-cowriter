// カラー文字列をRGBA形式に変換
export function parseColor(color: string): string {
  if (color.startsWith("[#")) {
    // "[#111C2F]/25" → "rgba(17, 28, 47, 0.25)"
    const hex = color.match(/\[#([0-9A-Fa-f]{6})\]/)?.[1];
    const opacity = color.match(/\/(\d+)/)?.[1];
    if (hex && opacity) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${parseInt(opacity) / 100})`;
    }
  } else if (color.startsWith("white/")) {
    // "white/90" → "rgba(255, 255, 255, 0.9)"
    const opacity = color.split("/")[1];
    return `rgba(255, 255, 255, ${parseInt(opacity) / 100})`;
  }
  return color;
}
