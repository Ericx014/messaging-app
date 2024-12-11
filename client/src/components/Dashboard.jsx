import React from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation"
import { useConversations } from "../context/ConversationsProvider";

export default function Dashboard({id}) {
	const {selectedConversation} = useConversations();

  return (
    <section className="bg-gray-100 flex flex-row h-screen">
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </section>
  );
}
