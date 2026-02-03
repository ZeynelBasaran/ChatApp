"use client";

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'

export function QueryProvider({ children }) {
    // QueryClient'ı useState içinde oluşturarak her render'da yeniden oluşturulmasını önle
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // SSR için
                        staleTime: 60 * 1000, // 1 dakika
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

