import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiFactory from "../lib/axios";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";

export const useChatService = () => {
    const queryClient = useQueryClient();
    const { selectedUser, setMessages, addMessage, messages } = useChatStore();
    const { authUser, socket } = useAuthStore();

    // 1. Get All Contacts
    const contactsQuery = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const { data } = await apiFactory.get("/message/contacts");
            return data;
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not load contacts");
        },
    });

    // 2. Get My Chat Partners (Chats)
    const chatsQuery = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const { data } = await apiFactory.get("/message/chats");
            return data;
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not load chats");
        },
    });

    // 3. Get Messages by User ID
    const messagesQuery = useQuery({
        queryKey: ["messages", selectedUser?._id],
        queryFn: async () => {
            if (!selectedUser?._id) return [];
            const { data } = await apiFactory.get(`/message/${selectedUser._id}`);
            return data;
        },
        enabled: !!selectedUser?._id, // Don't fetch if no user selected
    });

    // 4. Send Message Mutation
    const sendMessageMutation = useMutation({
        mutationFn: async (messageData) => {
            const tempId = `temp-${Date.now()}`;

            // Optimistic Message (to update UI immediately)
            const optimisticMessage = {
                _id: tempId,
                senderId: authUser?._id,
                receiverId: selectedUser?._id,
                text: messageData.text,
                image: messageData.image,
                createdAt: new Date().toISOString(),
                isOptimistic: true, // Optimistic flag (optional indicator)
            };

            // Add message to list without waiting
            addMessage(optimisticMessage);

            // The actual POST request to execute
            const { data } = await apiFactory.post(`/message/send/${selectedUser._id}`, messageData);

            return { apiData: data, tempId };
        },
        onSuccess: ({ apiData, tempId }) => {
            // We remove the optimistic (temp) message and add the real DB version.
            // (Because state is managed in Zustand store instead of React-Query query state)
            const currentMessages = useChatStore.getState().messages;
            const updatedMessages = currentMessages
                .filter((m) => m._id !== tempId) // Removed fake tempId
                .concat(apiData); // Added real response data

            setMessages(updatedMessages);

            // We can silently refresh the main chat list in the background (e.g. for preview)
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        },
        onError: (error) => {
            // If an error occurs, refetch messages to clear the temporary message.
            queryClient.invalidateQueries({ queryKey: ["messages", selectedUser?._id] });
            toast.error(error.response?.data?.message || "Error sending message");
        },
    });

    return {
        contactsQuery,
        chatsQuery,
        messagesQuery,
        sendMessageMutation,
    };
};
