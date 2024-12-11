import React, { useContext, useEffect, useState, useCallback } from "react";
import useLocalStorage from "../components/hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
import { v4 as uuidv4 } from "uuid";

const ConversationsContext = React.createContext();

function useConversations() {
  return useContext(ConversationsContext);
}

function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  const createConversations = (recipients) => {
    setConversations((prevConversations) => {
      return [
        ...prevConversations,
        { conversationId: uuidv4(), recipients, messages: [] },
      ];
    });
  };

  const addMessageToConversation = useCallback(
    ({ conversationId, recipients, sender, text }) => {
      setConversations((prevConversations) => {
        const newMessage = { sender, text };
        // If target conversation is found, add message into target conversation's messages array
        // Else conversation remains unchanged
        const updatedConversations = prevConversations.map((conversation) => {
          if (conversationId === conversation.conversationId) {
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        // Find target conversation in updated conversations (based on id)
        const matchingConversation = updatedConversations.find(
          (c) => c.conversationId === conversationId
        );

        // If target conversation not found, add conversation
        // If target is found, do nothing as message is already added.
        if (!matchingConversation) {
          updatedConversations.push({
            conversationId: conversationId,
            recipients: recipients.filter((recipient) => recipient !== id),
            messages: [{ sender, text }],
          });
        }
        return updatedConversations;
      });
    },
    [setConversations, id]
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(selectedConversationId, recipients, text) {
    socket.emit("send-message", {
      conversationId: selectedConversationId,
      recipients,
      text,
    });
    addMessageToConversation({
      conversationId: selectedConversationId,
      recipients,
      text,
      sender: id,
    });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      // const name = contact.name;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, index, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversations,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayIsEqual(a, b) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}

export { useConversations, ConversationsProvider };
