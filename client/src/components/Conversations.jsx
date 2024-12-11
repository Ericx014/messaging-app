import { useConversations } from "../context/ConversationsProvider";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <>
      {conversations.map((conversation) => (
        <div
          key={conversation.index}
          onClick={() => {
            selectConversationIndex(conversation.index);
						console.log(conversation)
          }}
          className={`w-full py-3 px-4 cursor-pointer transition-colors duration-200 
            ${
              conversation.selected
                ? "bg-[#415a77] text-white hover:bg-[#31445a]"
                : "hover:bg-gray-100 text-gray-800"
            }`}
        >
          {conversation.recipients.map((r) => r.name).join(", ")}
        </div>
      ))}
    </>
  );
}
