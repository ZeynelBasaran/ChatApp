import { create } from "zustand";

// To prevent errors during Next.js SSR where the window object is not defined
const getInitialSoundState = () => {
    if (typeof window !== "undefined") {
        const val = localStorage.getItem("isSoundEnabled");
        if (val !== null) return JSON.parse(val) === true;
    }
    return true; // Default value
};

export const useChatStore = create((set, get) => ({
    activeTab: "chats",
    selectedUser: null,
    isSoundEnabled: getInitialSoundState(),
    messages: [], // Keeping messages here for socket operations and optimistic UI
    chats: [],


    toggleSound: () => {
        const nextVal = !get().isSoundEnabled;
        if (typeof window !== "undefined") {
            localStorage.setItem("isSoundEnabled", JSON.stringify(nextVal));
        }
        set({ isSoundEnabled: nextVal });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    setMessages: (messages) => set({ messages }),

    addMessage: (message) => set({ messages: [...get().messages, message] }),

    subscribeToMessages: (socket) => {
        if (!socket) return;

        // First clear if the same event is being listened to (for multiple render issues)
        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            const { selectedUser, isSoundEnabled, addMessage } = get();

            // Did the message come from the selected user?
            if (!selectedUser) return;
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            addMessage(newMessage);

            if (isSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");
                notificationSound.currentTime = 0;
                notificationSound.play().catch(() => { });
            }
        });
    },

    unsubscribeFromMessages: (socket) => {
        if (socket) {
            socket.off("newMessage");
        }
    },
}));
