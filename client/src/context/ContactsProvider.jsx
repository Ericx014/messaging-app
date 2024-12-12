import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "../components/hooks/useLocalStorage";
import ContactServices from "../services/contacts";
import { useCurrentId } from "../components/App";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const { id } = useCurrentId();
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [existingContacts, setExistingContacts] = useState([]);
  const [currentUserContacts, setCurrentUserContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedUsers = await ContactServices.getAll();
        setExistingContacts(fetchedUsers);

        const contactsOfCurrentUser = fetchedUsers.filter(
          (contact) => contact.addedBy === id
        );
        setCurrentUserContacts(contactsOfCurrentUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchContacts();
  }, [id]);

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
      // setContacts((prevContacts) => {
      //   return [...prevContacts, { contactId, name, addedBy: id }];
      // });
			setCurrentUserContacts((prevExistingContacts) => {
        return [...prevExistingContacts, createdContact];
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
    <ContactsContext.Provider
      value={{ contacts: currentUserContacts, createContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
