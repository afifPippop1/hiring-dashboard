"use client";
import { getQueryClient } from "@/lib/get-query-client";
import { AuthProvider } from "@/context/auth-context";
import { JobOpeningProvider } from "@/context/job-opening-context";
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
