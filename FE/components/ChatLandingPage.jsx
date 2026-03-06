"use client";
import { useEffect } from "react";
import { useAuthService } from "../service/authService";
import { useAuthStore } from "../store/authStore";
import { useChatService } from "../service/chatService";
import { useChatStore } from "../store/chatStore";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import ProfileHeader from "./ProfileHeader";
import ActiveTabSwitch from "./ActiveTabSwitch";
import ChatList from "./ChatPage/ChatList";
import ContactList from "./ChatPage/ContactList";

  

const HomePage = () => {
  const { setAuthUser, connectSocket, disconnectSocket, socket } = useAuthStore();
  const { subscribeToMessages, unsubscribeFromMessages,activeTab } = useChatStore();

  const { authQuery, logoutMutation } = useAuthService();
  const { chatsQuery, contactsQuery } = useChatService();

  const { data: user, isLoading, isError } = authQuery;

  // Auth geldiyse store'a yaz ve socket'e bağlan
  useEffect(() => {
    if (user) {
      setAuthUser(user);
      connectSocket();
    }
  }, [user, setAuthUser, connectSocket]);

  // Socket bağlandığında mesajları dinlemeye başla
  useEffect(() => {
    if (socket) {
      subscribeToMessages(socket);
    }

    // Component unmount olduğunda dinlemeyi bırak
    return () => {
      if (socket) {
        unsubscribeFromMessages(socket);
      }
    };
  }, [socket, subscribeToMessages, unsubscribeFromMessages]);

  // Sayfadan çıkıldığında genel socket bağlantısını kes
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);


  if (isLoading) return <Loading />;
  if (isError) return <Error />;


  return (
    <main className={`flex-1 flex flex-col items-center h-full justify-center text-center lg:px-20 md:px-8 px-4 mx-auto max-w-360`}>
      <div className="relative w-full max-w-6xl h-[800px]">
          {/* LEFT SIDE */}
          <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
            {`selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />`}
          </div>
      </div>

      {/* Örnek Chat/Rehber Verisi Gösterimi: Yeni UI yapılarını buraya entegre edebilirsin */}
      <div className="mt-8 flex gap-4 text-sm text-gray-500">
        <p>
          {contactsQuery.isLoading ? "Loading contacts..." : `${contactsQuery.data?.length || 0} Contacts available`}
        </p>
        <p>
          {chatsQuery.isLoading ? "Loading chats..." : `${chatsQuery.data?.length || 0} Active chats`}
        </p>
      </div>

    </main>
  );
};

export default HomePage;
