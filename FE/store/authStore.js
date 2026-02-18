import { create } from "zustand";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (authUser) => {
    if (!authUser || get().socket?.connected) return;

    const socket = io(API_BASE_URL, { withCredentials: true });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));