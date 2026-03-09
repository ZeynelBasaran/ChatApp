import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiFactory from "../lib/axios";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";
import { useRouter } from "../i18n/navigation";

export const useAuthService = () => {
  const queryClient = useQueryClient();
  const { connectSocket, disconnectSocket, setAuthUser } = useAuthStore();
  const router = useRouter();

  // 1. Auth Check
  const authQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await apiFactory.get("/auth/check");
      setAuthUser(data);
      connectSocket();
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

      // Helper cookie because Netlify/Next.js cannot see backend cookie (jwt):
      document.cookie = "auth_indicator=true; path=/; max-age=604800"; // 7 days

      toast.success("Login successful", {
        description: "You are being redirected.",
      });
      router.push("/");
      router.refresh(); // Ensure the server components re-evaluate the cookies
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

  // 4. Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: () => apiFactory.post("/auth/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      disconnectSocket();

      // Delete helper cookie when user logs out
      document.cookie = "auth_indicator=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      toast.success("Logged out successfully", {
        description: "Hope to see you again!",
      });

      setAuthUser(null);

      router.refresh(); // Trigger server components
    },
    onError: () => {
      toast.error("An error occurred during logout.");
    },
  });

  // 5. Update Profile
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiFactory.put("/auth/update-profile", data);
      return res.data;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["authUser"], updatedUser);
      setAuthUser(updatedUser);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error("Error updating profile", {
        description: error.response?.data?.message || "Something went wrong.",
      });
    },
  });

  return {
    authQuery,
    signupMutation,
    loginMutation,
    logoutMutation,
    updateProfileMutation,
  };
};
