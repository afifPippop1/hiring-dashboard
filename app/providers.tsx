"use client";
import { getQueryClient } from "@/lib/get-query-client";
import { AuthProvider } from "@/stores/auth-provider";
import { JobOpeningProvider } from "@/stores/job-opening.provider";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <React.Suspense>
          <JobOpeningProvider>{children}</JobOpeningProvider>
        </React.Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}
