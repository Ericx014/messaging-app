import { useConversations } from "../context/ConversationsProvider";
import { useContacts } from "../context/ContactsProvider";
import { useCurrentId } from "./App";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();
  const { contacts } = useContacts();
  const { id } = useCurrentId();

  return (
    <>
      {conversations.map((conversation) => (
        <div
          key={conversation.index}
          onClick={() => {
            selectConversationIndex(conversation.index);
            console.log(conversation);
          }}
          className={`w-full py-3 px-4 cursor-pointer transition-colors duration-200 
            ${
              conversation.selected
                ? "bg-[#415a77] text-white hover:bg-[#31445a]"
                : "hover:bg-gray-100 text-gray-800"
            }`}
        >
          {conversation.recipients.length === 2
            ? conversation.recipients
                .filter((r) => r.id !== id)
                .map((r) => {
                  const contact = contacts.find(
                    (contact) => contact.contactId === r.id
                  );
                  return contact ? contact.name : r.id;
                })[0]
            : conversation.recipients
                .map((r) => {
                  if (r.id === id) {
                    return "you";
                  }
                  const contact = contacts.find(
                    (contact) => contact.contactId === r.id
                  );
                  return contact ? contact.name : r.id;
                })
                .join(", ")}
        </div>
      ))}
    </>
  );
}
