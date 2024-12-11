import { useContext, createContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";

export const IdContext = createContext();

const App = () => {
  const [id, setId] = useLocalStorage("id");

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

  return id ? dashboard : <Login onIdSubmit={setId} />;
};
export const useCurrentId = () => {
  return useContext(IdContext);
};

export default App;
