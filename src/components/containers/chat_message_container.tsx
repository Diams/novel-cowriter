import ChatMessage from "@/components/displays/chat_message";
import { ChatMessageData } from "@/utils/data_type";

export default function ChatMessageContainer({
  chat_message,
}: {
  chat_message: ChatMessageData[];
}) {
  return (
    <>
      {chat_message.map((message, index) => (
        <ChatMessage
          key={index + "-" + message.role + "-" + message.content}
          role={message.role as "user" | "assistant"}
          content={message.content}
        />
      ))}
    </>
  );
}
