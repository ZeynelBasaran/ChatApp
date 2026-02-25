"use client";

import Link from "next/link";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../service/authService";

/**
 * FooterLinks — Client Component
 * İki kaynaktan auth kontrolü yapar:
 * 1. isAuthServer: Server side cookie kontrolü (SSR anında doğru bilgi)
 * 2. authStore / authQuery: Client side, SPA geçişlerinde gerçek zamanlı güncellenir
 */
export default function FooterLinks({ isAuthServer, signUpLabel, loginLabel, linksLabel }) {
    const { authUser } = useAuthStore();
    const { authQuery } = useAuth();

    // İkisinden biri true ise giriş yapılmış sayılır
    const isAuth = isAuthServer || !!authUser || !!authQuery.data;


    console.log("isAuthServer", isAuthServer);
    console.log("authUser", authUser);
    console.log("authQuery.data", authQuery.data);


    if (isAuth) return null;



    return (
        <div>
            <h2 className="mb-2 text-sm font-semibold uppercase">{linksLabel}</h2>
            <ul className="space-y-2">
                <li>
                    <Link href="/signup" className="hover:underline">
                        {signUpLabel}
                    </Link>
                </li>
                <li>
                    <Link href="/login" className="hover:underline">
                        {loginLabel}
                    </Link>
                </li>
            </ul>
        </div>
    );
}
