import React, { useContext, useEffect, useState, useCallback } from "react";
import useLocalStorage from "../components/hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
import { v4 as uuidv4 } from "uuid";
import ConversationServices from "../services/conversations";

const ConversationsContext = React.createContext();

function useConversations() {
  return useContext(ConversationsContext);
}

function ConversationsProvider({ id, children }) {
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();
	  const [conversations, setConversations] = useLocalStorage(
      "conversations",
      []
    );

  useEffect(() => {
    const loadConversations = async () => {
      const fetchedConversations = await ConversationServices.getAll();
      const userConv = fetchedConversations.filter((conversation) =>
        conversation.recipients.includes(id)
      );
      console.log("Current user conv", userConv);
      setConversations(userConv);
    };
    loadConversations();
  }, [id]);

  const createConversations = async (recipients) => {
    const newConversation = {
      conversationId: uuidv4(),
      recipients: [...recipients, id],
      messages: [],
    };
    const savedConversation = await ConversationServices.create(
      newConversation
    );
    console.log(savedConversation);
    setConversations((prevConversations) => {
      return [...prevConversations, newConversation];
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
            recipients: recipients,
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

  const sendMessage = async (selectedConversationId, recipients, text) => {
    try {
      // Send message to socket
      socket.emit("send-message", {
        conversationId: selectedConversationId,
        recipients,
        text,
      });
      const message = {
        sender: id,
        text,
      };

      // Add message to db
      const updatedConversation = await ConversationServices.addMessage(
        selectedConversationId,
        message
      );
      console.log("Message added successfully", updatedConversation);

      // Add message to chat (frontend)
      addMessageToConversation({
        conversationId: selectedConversationId,
        recipients,
        text,
        sender: id,
      });
    } catch (e) {
      console.error("Failed to add message to conversation", error);
    }
  };

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

export { useConversations, ConversationsProvider };
