import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "../components/hooks/useLocalStorage";
import ContactServices from "../services/contacts";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [existingContacts, setExistingContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedUsers = await ContactServices.getAll();
        console.log("Existing contacts", fetchedUsers);
        setExistingContacts(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchContacts();
  }, []);

  const contactExists = (newContact) => {
    return existingContacts.some(
      (existingContact) =>
        existingContact.contactId === newContact.contactId &&
        existingContact.addedBy === newContact.addedBy
    );
  };

  const createContact = async (contactId, name, id) => {
    const newContactObject = { contactId, name, addedBy: id };

    if (contactExists(newContactObject)) {
      alert("Contact already exists");
      console.warn("Contact already exists");
      return null;
    }

    try {
      const createdContact = await ContactServices.create(newContactObject);
      setContacts((prevContacts) => {
        return [...prevContacts, { contactId, name, addedBy: id }];
      });

      setExistingContacts((prevExistingContacts) => {
        return [...prevExistingContacts, createdContact];
      });

      console.log("Contact created successfully", createdContact);
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
