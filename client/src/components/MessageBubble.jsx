import { useContacts } from "../context/ContactsProvider";

const MessageBubble = ({ message, lastMessage, lastMessageRef }) => {
  const { contacts } = useContacts();
  const contact = contacts.find((contact) => contact.contactId === message.sender);
  const notyou = (contact ? contact.name : message.sender);

  return (
    <>
      <div
			onClick={() => console.log(message)}
        ref={lastMessage ? lastMessageRef : null}
        className={`mx-2 m-1 px-3 p-2 rounded-full max-w-[30%]  ${
          message.fromMe
            ? "self-end bg-[#415a77] text-white rounded-br-none"
            : "self-start bg-gray-300 text-black rounded-bl-none"
        }`}
      >
        <div>{message.text}</div>
      </div>
      <div
        className={`text-muted text-gray-400 small mx-2 mb-4 ${
          message.fromMe ? "text-right" : ""
        }`}
      >
        {message.fromMe ? "You" : notyou}
      </div>
    </>
  );
};

export default MessageBubble;
