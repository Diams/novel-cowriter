import RoleContentCard from "@/components/displays/role_content_card";

export default function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  return (
    <RoleContentCard
      role={role === "user" ? "あなた" : "AIアシスタント"}
      className={`text-xs border rounded-xl py-2 px-3 space-y-2 whitespace-pre-wrap ${
        role === "user"
          ? "bg-good/8 border-good/35"
          : "bg-accent/8 border-accent/35"
      }`}
    >
      {content}
    </RoleContentCard>
  );
}
