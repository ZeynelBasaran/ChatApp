import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiFactory from "../lib/axios";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";
import { useRouter } from "../i18n/navigation";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { connectSocket, disconnectSocket, setAuthUser } = useAuthStore();
  const router = useRouter();

  // 1. Auth Kontrolü
  const authQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await apiFactory.get("/auth/check");
      setAuthUser(data);
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
      console.log("login res", res.data)
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      connectSocket(data);

      // Backend cookie'sini (jwt) Netlify/Next.js göremediği için yardımcı cookie:
      document.cookie = "auth_indicator=true; path=/; max-age=604800"; // 7 days

      toast.success("Login successful", {
        description: "You are being redirected.",
      });
      router.push("/");
      router.refresh(); // Ensure the server components re-evaluate the cookies
    },

    onError: (error) => {
      toast.error("Login failed", console.log("hata", error), {
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

      // Kullanıcı çıkış yaptığında yardımcı cookie'yi de sil
      document.cookie = "auth_indicator=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      toast.success("Çıkış yapıldı", {
        description: "Tekrar görüşmek üzere!",
      });

      setAuthUser(null);
      
      router.refresh(); // Server component'leri tetikle
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
