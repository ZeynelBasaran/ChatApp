"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";
import { useChatService } from "../../service/chatService";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";

import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
    const { selectedUser, subscribeToMessages, unsubscribeFromMessages, messages, setMessages } = useChatStore();
    const { authUser, socket } = useAuthStore();
    const { messagesQuery } = useChatService();
    const messageEndRef = useRef(null);

    const { data: fetchedMessages, isLoading: isMessagesLoading } = messagesQuery;

    // Seçili kullanıcı değiştiğinde messagesQuery'den gelen veriyi Zustand store'una eşitleyelim.
    // Aynı zamanda yeni kullanıcı seçildiğinde eski mesajları temizleyelim.
    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages, setMessages]);

    useEffect(() => {
        // Kullanıcı değiştiğinde veya yeni fetch başladığında (undefined ise) store'u boşalt
        if (selectedUser?._id && !fetchedMessages && isMessagesLoading) {
            setMessages([]);
        }
    }, [selectedUser?._id, isMessagesLoading, fetchedMessages, setMessages]);

    useEffect(() => {
        // Socket dinleyicisini seçili kullanıcı değiştiğinde yenileyelim ki
        // store'daki son selectedUser referansını yakalasın
        if (socket) {
            subscribeToMessages(socket);
        }

        return () => {
            if (socket) {
                unsubscribeFromMessages(socket);
            }
        };
    }, [selectedUser, socket, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full w-full">
            <ChatHeader />
            <div className="flex-1 px-6 overflow-y-auto py-8">
                {messages && messages.length > 0 && !isMessagesLoading ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`chat ${msg.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
                            >
                                <div
                                    className={`chat-bubble relative ${msg.senderId === authUser?._id
                                        ? "bg-cyan-600 text-white"
                                        : "bg-slate-800 text-slate-200"
                                        }`}
                                >
                                    {msg.image && (
                                        <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                                    )}
                                    {msg.text && <p className="mt-2">{msg.text}</p>}
                                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                                        {msg.createdAt && new Date(msg.createdAt).toLocaleTimeString(undefined, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {/* 👇 scroll target */}
                        <div ref={messageEndRef} />
                    </div>
                ) : isMessagesLoading ? (
                    <MessagesLoadingSkeleton />
                ) : (
                    <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
                )}
            </div>

            <MessageInput />
        </div>
    );
}

export default ChatContainer;