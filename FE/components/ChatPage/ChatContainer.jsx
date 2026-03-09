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

    // Sync data from messagesQuery to Zustand store when selected user changes.
    // Also clear old messages when a new user is selected.
    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages, setMessages]);

    useEffect(() => {
        // Clear store when user changes or new fetch starts (if undefined)
        if (selectedUser?._id && !fetchedMessages && isMessagesLoading) {
            setMessages([]);
        }
    }, [selectedUser?._id, isMessagesLoading, fetchedMessages, setMessages]);

    useEffect(() => {
        // Refresh the socket listener when the selected user changes so
        // it captures the latest selectedUser reference from the store
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
                                    className={`chat-bubble relative shadow-sm ${msg.senderId === authUser?._id
                                        ? "bg-cyan-600 text-white"
                                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
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