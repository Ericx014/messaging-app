/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCurrentId } from "./App";
import { BsThreeDotsVertical } from "react-icons/bs";

const DropDown = ({
  openModal,
  setActiveKey,
  CONVERSATIONS_KEY,
  CONTACTS_KEY,
}) => {
  const { id, setId } = useCurrentId();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openContactModal = () => {
    setActiveKey(CONTACTS_KEY);
    openModal();
    setIsOpen(false);
  };

  const openConversationModal = () => {
    setActiveKey(CONVERSATIONS_KEY);
    openModal();
    setIsOpen(false);
  };

  const viewContacts = () => {
    setActiveKey(CONTACTS_KEY);
    setIsOpen(false);
  };

	const viewConversations = () => {
    setActiveKey(CONVERSATIONS_KEY);
    setIsOpen(false);
  };

  const logout = () => {
    setId(null);
    localStorage.clear();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-2xl font-bold rounded-md hover:bg-gray-100 w-[30px] h-[30px] flex items-center justify-center"
      >
        <span className="flex items-center">
          <BsThreeDotsVertical />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="py-1">
            <li
              onClick={viewContacts}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              View Contacts
            </li>
            <li
              onClick={viewConversations}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              View Chats
            </li>
            <li
              onClick={openConversationModal}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Create Conversation
            </li>
            <li
              onClick={openContactModal}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Add Contact
            </li>
            <li
              onClick={() => logout()}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default DropDown;
