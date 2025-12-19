export interface CanonData {
  id: string;
  title: string;
  description: string;
  version: number;
  content: string;
  type: "settings" | "story";
}

export interface ChatMessageData {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ProjectData {
  structure_version: number;
  canons: CanonData[];
  chat_history: ChatMessageData[];
}
