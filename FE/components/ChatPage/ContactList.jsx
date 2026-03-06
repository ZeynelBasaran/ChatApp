"use client";

import { useEffect } from "react";
import { useChatStore } from "../../store/chatStore";
import UsersLoadingSkeleton from "../ChatPage/UsersLoadingSkeleton";
import { useAuthStore } from "../../store/authStore";
import { useChatService } from "../../service/chatService";

function ContactList() {
  const {  setSelectedUser,  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const { contactsQuery } = useChatService();
  const { data:allContacts, isLoading, isError } = contactsQuery;





  if (isLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts?.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;