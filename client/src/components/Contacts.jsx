import { useContacts } from "../context/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <div>
      {contacts.map((contact) => (
        <div
          key={contact.contactId}
          className="border-b-[1px] border-gray-200  mx-3 py-3"
					onClick={() => console.log(contact)}
        >
          {contact.name}
        </div>
      ))}
    </div>
  );
}
