import React, { useContext } from "react";
import useLocalStorage from "../components/hooks/useLocalStorage";
import ContactServices from "../services/contacts";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = async (contactId, name) => {
    const newContactObject = { contactId, name };

    try {
      const createdContact = await ContactServices.create(newContactObject);
      setContacts((prevContacts) => {
        return [...prevContacts, { contactId, name }];
      });
      console.log(createdContact);
    } catch (e) {
      console.error("Error creating contact", e);
    }
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
