"use client";
import { getQueryClient } from "@/lib/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { JobOpeningProvider } from "./(dashboard)/job-opening/job-opening.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense>
        <JobOpeningProvider>{children}</JobOpeningProvider>
      </React.Suspense>
    </QueryClientProvider>
  );
}
