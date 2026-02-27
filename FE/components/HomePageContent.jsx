"use client";

import HeroHomePage from "./HeroHomePage";
import ChatLandingPage from "./ChatLandingPage";
import { useAuthStore } from "../store/authStore";
import { useQueryClient } from "@tanstack/react-query";

/**
 * HomePageContent — Client Component
 * İki kaynaktan auth kontrolü yapar:
 * 1. isAuthServer: Server side cookie kontrolü (SSR anında doğru bilgi)
 * 2. authStore / authQuery: Client side, SPA geçişlerinde gerçek zamanlı güncellenir
 */
export default function HomePageContent({ isAuthServer }) {
    const { authUser } = useAuthStore();
    // useQueryClient: yeni istek açmadan mevcut React Query cache'ini okur
    const queryClient = useQueryClient();
    const cachedUser = queryClient.getQueryData(["authUser"]);

    const isAuth = isAuthServer || !!authUser || !!cachedUser;

    return isAuth ? <ChatLandingPage /> : <HeroHomePage />;
}
