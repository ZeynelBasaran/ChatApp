"use client";

import HeroHomePage from "./HeroHomePage";
import ChatLandingPage from "./ChatLandingPage";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../service/authService";

/**
 * HomePageContent — Client Component
 * İki kaynaktan auth kontrolü yapar:
 * 1. isAuthServer: Server side cookie kontrolü (SSR anında doğru bilgi)
 * 2. authStore / authQuery: Client side, SPA geçişlerinde gerçek zamanlı güncellenir
 */
export default function HomePageContent({ isAuthServer }) {
    const { authUser } = useAuthStore();
    const { authQuery } = useAuth();

    const isAuth = isAuthServer || !!authUser || !!authQuery.data;

    return isAuth ? <ChatLandingPage /> : <HeroHomePage />;
}
