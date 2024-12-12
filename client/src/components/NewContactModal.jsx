import { useRef } from "react";
import { useContacts } from "../context/ContactsProvider";
import { useCurrentId } from "./App";

export default function NewContactModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { id } = useCurrentId();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value, id);
		console.log(idRef.current.value, nameRef.current.value, id);
    closeModal();
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
        <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
        <input
          type="text"
          ref={idRef}
          placeholder="ID"
          required
          className="focus:outline-none focus:placeholder-transparent bg-gray-200 text-black px-4 py-2 rounded-lg w-full mb-7"
        />
        <input
          type="text"
          ref={nameRef}
          placeholder="Name"
          required
          className="focus:outline-none focus:placeholder-transparent bg-gray-200 text-black px-4 py-2 rounded-lg w-full mb-7"
        />
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
            className="w-[80px] px-4 py-2 bg-[#4a68a0] text-white rounded-md"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
