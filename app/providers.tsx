"use client";
import { AuthProvider } from "@/context/auth-context";
import { getQueryClient } from "@/lib/get-query-client";
import { PublicJobProvider } from "@/modules/jobs";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <React.Suspense>
          <PublicJobProvider>{children}</PublicJobProvider>
        </React.Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}
