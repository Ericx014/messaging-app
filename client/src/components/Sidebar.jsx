import { useState } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";
import DropDown from "./Dropdown";

const CONVERSATIONS_KEY = "conversation";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;
  const contactsOpen = activeKey === CONTACTS_KEY;

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="w-[350px] h-screen bg-gray-100 shadow-lg flex flex-col border-r border-gray-200">
      {/* Sidebar Navigation Buttons */}
      {/* <div className="flex flex-row border-b border-gray-200">
        <button
          className={`grow py-3 px-4 font-medium transition-colors ${
            conversationsOpen
              ? "bg-white text-[#415a77] border-b-2 border-[#415a77]"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveKey(CONVERSATIONS_KEY)}
        >
          Conversations
        </button>
        <button
          className={`grow py-3 px-4 font-medium transition-colors ${
            contactsOpen
              ? "bg-white text-[#415a77] border-b-2 border-[#415a77]"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveKey(CONTACTS_KEY)}
        >
          Contacts
        </button>
      </div> */}
      <div className="flex flex-row justify-between items-center mx-4 mt-6 mb-3">
        <h1 className="font-bold text-2xl">
          {activeKey == CONVERSATIONS_KEY ? "Chats" : "Contacts"}
        </h1>
        <DropDown
          openModal={() => setModalOpen(true)}
          CONVERSATIONS_KEY={CONVERSATIONS_KEY}
          CONTACTS_KEY={CONTACTS_KEY}
          setActiveKey={setActiveKey}
          // onLogout={logout}
        />
      </div>
      <div className="overflow-auto grow bg-white">
        {activeKey === CONVERSATIONS_KEY ? <Conversations /> : <Contacts />}
      </div>

      <div className="p-4 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
        Your ID: <span className="text-gray-800 font-semibold">{id}</span>
      </div>

      {/* <button
        onClick={() => setModalOpen(true)}
        className="w-full py-3 bg-[#415a77] text-white font-medium hover:bg-[#31445a] transition-colors focus:outline-none"
      >
        New {conversationsOpen ? "Conversation" : "Contact"}
      </button> */}

      {modalOpen && conversationsOpen && (
        <NewConversationModal closeModal={closeModal} />
      )}
      {modalOpen && contactsOpen && <NewContactModal closeModal={closeModal} />}
    </section>
  );
}
