import { useState, useCallback } from "react";
import { useConversations } from "../context/ConversationsProvider";
import MessageBubble from "./MessageBubble";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const lastMessageRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const { conversations, sendMessage, selectedConversation } =
    useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.conversationId,
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    console.log("Send message", {
      targetConversation: selectedConversation.conversationId,
      recipients: selectedConversation.recipients.map((r) => r.id),
      text: text,
    });
    setText("");
  };

  return (
    <div className="flex flex-col grow">
      <div className="bg-[#778da924] w-full py-3 px-5 capitalize font-semibold">
        {selectedConversation.recipients.map((r) => r.name).join(", ")}
      </div>
      <div className="flex flex-col grow overflow-auto p-2">
        {selectedConversation.messages.map((message, index) => {
          const lastMessage =
            selectedConversation.messages.length - 1 === index;
          return (
            <MessageBubble
              key={index}
              message={message}
              lastMessage={lastMessage}
              lastMessageRef={lastMessageRef}
            />
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#778da924] w-full py-3 flex items-center space-x-3 px-4"
      >
        <input
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a message"
          className="focus:outline-none focus:placeholder-transparent py-2 px-4 w-full max-w-[80%] bg-white rounded-full border border-gray-300 text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-[#415a77] text-white px-6 py-2 rounded-full hover:bg-[#31445a] transition-colors duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
