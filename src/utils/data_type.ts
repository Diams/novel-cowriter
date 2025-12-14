export interface CanonData {
  id: string;
  title: string;
  description: string;
  version: number;
  content: string;
  type: "settings" | "story";
}
