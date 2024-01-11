"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = { children: React.ReactNode };

export default function RQProvider({ children }: Props) {
    const [queryClient] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: true,
                    retryOnMount: true,
                    refetchOnReconnect: false,
                    retry: false,
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}
