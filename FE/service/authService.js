import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiFactory from "../lib/axios";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { connectSocket, disconnectSocket } = useAuthStore();
  const router = useRouter();

  // 1. Auth Kontrolü
  const authQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await apiFactory.get("/auth/check");
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // 2. Signup Mutation
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiFactory.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Registration successful", {
        description: "Your account has been created. Please log in.",
      });

      router.push("/login");
    },
    onError: (error) => {
      toast.error("Registration failed", {
        description:
          error.response?.data?.message ||
          "Please check your information and try again.",
      });
    },
  });

  // 3. Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiFactory.post("/auth/login", data);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      connectSocket(data);

      toast.success("Login successful", {
        description: "You are being redirected.",
      });
    },

    onError: (error) => {
      toast.error("Login failed", {
        description:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      });
    },
  });

  // 4. Logout Mutasyonu
  const logoutMutation = useMutation({
    mutationFn: () => apiFactory.post("/auth/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      disconnectSocket();
      toast.success("Çıkış yapıldı", {
        description: "Tekrar görüşmek üzere!",
      });
    },
    onError: () => {
      toast.error("Çıkış yapılırken bir hata oluştu.");
    },
  });

  return {
    authQuery,
    signupMutation,
    loginMutation,
    logoutMutation,
  };
};
