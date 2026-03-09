"use client";

import Link from "next/link";
import { useAuthStore } from "../store/authStore";
import { useQueryClient } from "@tanstack/react-query";

/**
 * FooterLinks — Client Component
 * Checks auth from two sources:
 * 1. isAuthServer: Server side cookie check (accurate info during SSR)
 * 2. authStore / authQuery: Client side, updates in real-time during SPA transitions
 */
export default function FooterLinks({ isAuthServer, signUpLabel, loginLabel, linksLabel }) {
    const { authUser } = useAuthStore();
    // useQueryClient: reads existing React Query cache without making a new request
    const queryClient = useQueryClient();
    const cachedUser = queryClient.getQueryData(["authUser"]);

    const isAuth = isAuthServer || !!authUser || !!cachedUser;

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
