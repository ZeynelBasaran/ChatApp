"use client";
import { useEffect } from "react";
import { useAuthService } from "../service/authService";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import ProfileHeader from "./ProfileHeader";
import ActiveTabSwitch from "./ActiveTabSwitch";
import ChatList from "./ChatPage/ChatList";
import ContactList from "./ChatPage/ContactList";
import ChatContainer from "./ChatPage/ChatContainer";
import NoConversationPlaceholder from "./ChatPage/NoConversationPlaceholder";



const HomePage = () => {
  const { setAuthUser, connectSocket, disconnectSocket, socket } = useAuthStore();
  const { subscribeToMessages, unsubscribeFromMessages, activeTab, selectedUser } = useChatStore();

  const { authQuery } = useAuthService();
  const { data: user, isLoading, isError } = authQuery;

  // If authenticated, write to store and connect to socket
  useEffect(() => {
    if (user) {
      setAuthUser(user);
      connectSocket();
    }
  }, [user, setAuthUser, connectSocket]);

  // Start listening for messages when socket connects
  useEffect(() => {
    if (socket) {
      subscribeToMessages(socket);
    }

    // Stop listening on component unmount
    return () => {
      if (socket) {
        unsubscribeFromMessages(socket);
      }
    };
  }, [socket, subscribeToMessages, unsubscribeFromMessages]);

  // Disconnect general socket when leaving the page
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);


  if (isLoading) return <Loading />;
  if (isError) return <Error />;


  return (
    <main className={`flex-1 flex flex-col items-center h-full justify-center text-center lg:px-20 md:px-8 px-4 mx-auto max-w-360 w-full `}>
      <div className="relative w-full flex max-w-6xl h-[800px] border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* LEFT SIDE */}
        <div className={`bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm flex-col ${selectedUser ? "hidden md:flex" : "flex"} w-full md:w-80`}>
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={`flex-col bg-slate-50/60 dark:bg-slate-900/50 backdrop-blur-sm w-full ${!selectedUser ? "hidden md:flex" : "flex"} flex-1`}>
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>



    </main>
  );
};

export default HomePage;
