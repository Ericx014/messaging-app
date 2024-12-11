const MessageBubble = ({ message, lastMessage, lastMessageRef }) => (
  <>
    <div
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
      {message.fromMe ? "You" : message.senderName}
    </div>
  </>
);

export default MessageBubble;
