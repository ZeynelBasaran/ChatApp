import { create } from "zustand";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],
  authUser: null,

  setAuthUser: (user) => set({ authUser: user }),

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(API_BASE_URL, {
      withCredentials: true,
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
}));
