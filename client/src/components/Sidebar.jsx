import { useState } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";
import DropDown from "./Dropdown";
import useLocalStorage from "./hooks/useLocalStorage";

const CONVERSATIONS_KEY = "conversation";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useLocalStorage("sidebartab", CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;
  const contactsOpen = activeKey === CONTACTS_KEY;

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="w-[350px] h-screen bg-gray-100 shadow-lg flex flex-col border-r border-gray-200">
      <div className="flex flex-row justify-between items-center mx-4 mt-6 mb-3">
        <h1 className="font-bold text-2xl">
          {activeKey == CONVERSATIONS_KEY ? "Chats" : "Contacts"}
        </h1>
        <DropDown
          openModal={() => setModalOpen(true)}
          CONVERSATIONS_KEY={CONVERSATIONS_KEY}
          CONTACTS_KEY={CONTACTS_KEY}
          setActiveKey={setActiveKey}
        />
      </div>
      <div className="overflow-auto grow bg-white">
        {activeKey === CONVERSATIONS_KEY ? <Conversations /> : <Contacts />}
      </div>

      <div className="p-4 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
        Your ID: <span className="text-gray-800 font-semibold">{id}</span>
      </div>

      {modalOpen && conversationsOpen && (
        <NewConversationModal closeModal={closeModal} />
      )}
      {modalOpen && contactsOpen && <NewContactModal closeModal={closeModal} />}
    </section>
  );
}
