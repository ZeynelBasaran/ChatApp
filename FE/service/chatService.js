import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiFactory from "../lib/axios";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner"; // react-hot-toast yerine proje genelinde sonner var ise

export const useChatService = () => {
    const queryClient = useQueryClient();
    const { selectedUser, setMessages, addMessage, messages } = useChatStore();
    const { authUser, socket } = useAuthStore();

    // 1. Get All Contacts
    const contactsQuery = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const { data } = await apiFactory.get("/messages/contacts");
            return data;
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Kişiler yüklenemedi");
        },
    });

    // 2. Get My Chat Partners (Chats)
    const chatsQuery = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const { data } = await apiFactory.get("/messages/chats");
            return data;
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Sohbetler yüklenemedi");
        },
    });

    // 3. Get Messages by User ID
    const messagesQuery = useQuery({
        queryKey: ["messages", selectedUser?._id],
        queryFn: async () => {
            if (!selectedUser?._id) return [];
            const { data } = await apiFactory.get(`/messages/${selectedUser._id}`);

            // Zustand store'u güncelle (Socket işlemleri için messages listesi store'dan takip ediliyor)
            setMessages(data);
            return data;
        },
        enabled: !!selectedUser?._id, // Seçili kullanıcı yoksa istek atma
        onError: (error) => {
            toast.error(error.response?.data?.message || "Mesajlar yüklenemedi");
        },
    });

    // 4. Send Message Mutation
    const sendMessageMutation = useMutation({
        mutationFn: async (messageData) => {
            const tempId = `temp-${Date.now()}`;

            // Optimistic Message (UI'ı hemen güncellemek için)
            const optimisticMessage = {
                _id: tempId,
                senderId: authUser?._id,
                receiverId: selectedUser?._id,
                text: messageData.text,
                image: messageData.image,
                createdAt: new Date().toISOString(),
                isOptimistic: true, // Optimistic flag (optional indicator)
            };

            // Beklemeden mesajı listeye ekle
            addMessage(optimisticMessage);

            // Gerçekleştirilecek olan POST isteği
            const { data } = await apiFactory.post(`/messages/send/${selectedUser._id}`, messageData);

            return { apiData: data, tempId };
        },
        onSuccess: ({ apiData, tempId }) => {
            // Optimizm (temp) ile gelen mesajı listeden çıkarıp gerçek DB halini ekliyoruz.
            // (React-Query query state yerine durum Zustand store üzerinde yönetildiğinden)
            const currentMessages = useChatStore.getState().messages;
            const updatedMessages = currentMessages
                .filter((m) => m._id !== tempId) // Fake tempId silindi
                .concat(apiData); // Gerçek response datası eklendi

            setMessages(updatedMessages);

            // Ana sohbetler listesini arka planda sessizce yenileyebiliriz (örn. preview için)
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        },
        onError: (error) => {
            // Hata olursa geçici mesajı temizlemek için mesajları tekrar çektir.
            queryClient.invalidateQueries({ queryKey: ["messages", selectedUser?._id] });
            toast.error(error.response?.data?.message || "Mesaj gönderilirken hata oluştu");
        },
    });

    return {
        contactsQuery,
        chatsQuery,
        messagesQuery,
        sendMessageMutation,
    };
};
