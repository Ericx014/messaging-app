import { useState } from "react";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversations } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversations(selectedContactIds);
    closeModal();
  };

  const handleCheckBoxChange = (contactId) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[400px] relative"
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-3 rounded-md text-2xl font-bold w-[30px] h-[30px] flex items-center justify-center"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Create Conversation</h2>
        {contacts.map((contact, index) => (
          <div key={contact.id}>
            <input
              id={index}
              type="checkbox"
              value={selectedContactIds.includes(contact.id)}
              onChange={() => handleCheckBoxChange(contact.id)}
            />
            <label htmlFor={index}>{contact.name}</label>
          </div>
        ))}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={closeModal}
            className="w-[80px] px-4 py-2 bg-[#778da941] rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[80px] px-4 py-2 bg-[#1b263b] text-white rounded-md"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
