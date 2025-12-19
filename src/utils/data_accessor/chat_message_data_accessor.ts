import { ChatMessageData } from "@/utils/data_type";

const STORAGE_KEY = "chat_messages";

export function GetAllChatMessages(): ChatMessageData[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to get chat messages from localStorage:", error);
    return [];
  }
}

export function SaveChatMessages(messages: ChatMessageData[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save chat messages to localStorage:", error);
  }
}
