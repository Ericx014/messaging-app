import { useContext, createContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";
import userServices from "../services/users";

export const IdContext = createContext();

const App = () => {
  const [id, setId] = useLocalStorage("id");

  // Add functionality to not create user if user already exists
  // Get all users and map through to check using find() or some()
  const login = async (id) => {
    try {
      const createdUser = await userServices.create({ userId: id });
      console.log(createdUser);
      setId(id);
    } catch (e) {
      console.error(e);
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
export const useCurrentId = () => {
  return useContext(IdContext);
};

export default App;
