import { create } from "zustand";

// Next.js SSR sırasında window nesnesi tanımlı olmadığı için hata almamak adına
const getInitialSoundState = () => {
    if (typeof window !== "undefined") {
        const val = localStorage.getItem("isSoundEnabled");
        if (val !== null) return JSON.parse(val) === true;
    }
    return true; // Varsayılan değer
};

export const useChatStore = create((set, get) => ({
    activeTab: "chats",
    selectedUser: null,
    isSoundEnabled: getInitialSoundState(),
    messages: [], // Mesajları socket işlemleri ve optimistic UI için burada tutuyoruz,
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
        const { selectedUser, isSoundEnabled, addMessage } = get();
        if (!selectedUser || !socket) return;

        // Önce aynı event dinleniyorsa temizle (çoklu render sorunları için)
        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            // Mesaj seçili olandan mı geldi?
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            addMessage(newMessage);

            if (isSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");
                notificationSound.currentTime = 0;
                notificationSound.play().catch((e) => console.log("Audio play failed:", e));
            }
        });
    },

    unsubscribeFromMessages: (socket) => {
        if (socket) {
            socket.off("newMessage");
        }
    },
}));
