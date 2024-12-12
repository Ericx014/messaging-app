import { useState, useContext, createContext, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";
import userServices from "../services/users";

const IdContext = createContext();

export const useCurrentId = () => {
  return useContext(IdContext);
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [id, setId] = useLocalStorage("id");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userServices.getAll();
        console.log("Existing users", fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Add functionality to not create user if user already exists
  // Get all users and map through to check using find() or some()
  const login = async (inputUserId) => {
    const idExists = users.some((user) => user.userId === inputUserId);
    if (!idExists) {
      try {
        const createdUser = await userServices.create({ userId: inputUserId });
        console.log(createdUser);
        setId(id);
        setUsers((prevUsers) => [...prevUsers, createdUser]);
      } catch (e) {
        console.error(e);
      }
    } else {
      setId(inputUserId);
    }
  };

  const dashboard = (
    <IdContext.Provider value={{ id, setId }}>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </IdContext.Provider>
  );

  return id ? dashboard : <Login onIdSubmit={login} />;
};

export default App;
